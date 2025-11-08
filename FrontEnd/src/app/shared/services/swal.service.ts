import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swal, { SweetAlertOptions } from 'sweetalert2';

export type SwalInput = string | SweetAlertOptions;

@Injectable({
  providedIn: 'root'
})
export class SwalService implements OnDestroy {
  private observer: MutationObserver | null = null;
  private defaultContainerSelector = 'app-main-layout';
  private defaultAppearTimeout = 0;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Only initialize MutationObserver in browser environment
    if (this.isBrowser) {
      this.initializeMutationObserver();
    }
  }

  private initializeMutationObserver(): void {
    try {
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.classList.contains('swal2-container')) {
              this.moveSwalToContainer(this.defaultContainerSelector, this.defaultAppearTimeout);
            }
          });
        });
      });

      this.observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } catch (error) {
      console.warn('MutationObserver initialization failed:', error);
    }
  }

  fire(options: SweetAlertOptions, appearTimeout: number = 5000, containerSelector?: string) {
    // Only execute in browser environment
    if (!this.isBrowser) {
      console.warn('SwalService: Not in browser environment');
      return Promise.resolve({} as any);
    }

    Swal.close();

    return Swal.fire({
      ...options,
      didOpen: (popup: HTMLElement) => {
        setTimeout(() => {
          const targetContainer = containerSelector || this.defaultContainerSelector;
          this.moveSwalToContainer(targetContainer, 0);
        }, appearTimeout);

        if (options.didOpen) {
          options.didOpen(popup);
        }
      }
    });
  }

  showLoading(input: SwalInput = 'Loading...', appearTimeout: number = 5000, containerSelector?: string) {
    const options = this.parseInput(input);
    return this.fire({
      ...options,
      allowOutsideClick: false,
      didOpen: (popup: HTMLElement) => {
        Swal.showLoading();
        if (options.didOpen) {
          options.didOpen(popup);
        }
      }
    }, appearTimeout, containerSelector);
  }

  success(input: SwalInput, appearTimeout: number = 5000, containerSelector?: string) {
    const options = this.parseInput(input);
    return this.fire({
      ...options,
      icon: 'success',
      confirmButtonText: options.confirmButtonText || 'OK'
    }, appearTimeout, containerSelector);
  }

  error(input: SwalInput, appearTimeout: number = 5000, containerSelector?: string) {
    const options = this.parseInput(input);
    return this.fire({
      ...options,
      icon: 'error',
      confirmButtonText: options.confirmButtonText || 'OK'
    }, appearTimeout, containerSelector);
  }

  warning(input: SwalInput, appearTimeout: number = 5000, containerSelector?: string) {
    const options = this.parseInput(input);
    return this.fire({
      ...options,
      icon: 'warning',
      confirmButtonText: options.confirmButtonText || 'OK'
    }, appearTimeout, containerSelector);
  }

  info(input: SwalInput, appearTimeout: number = 5000, containerSelector?: string) {
    const options = this.parseInput(input);
    return this.fire({
      ...options,
      icon: 'info',
      confirmButtonText: options.confirmButtonText || 'OK'
    }, appearTimeout, containerSelector);
  }

  private parseInput(input: SwalInput): SweetAlertOptions {
    if (typeof input === 'string') {
      return { title: input };
    } else {
      return input;
    }
  }

  private moveSwalToContainer(containerSelector: string, timeout: number = 0): void {
    // Only execute in browser environment
    if (!this.isBrowser) return;

    setTimeout(() => {
      const swalContainer = document.querySelector('.swal2-container');
      const targetContainer = document.querySelector(containerSelector);

      if (swalContainer && targetContainer && swalContainer.parentElement !== targetContainer) {
        targetContainer.appendChild(swalContainer);
      }
    }, timeout);
  }

  // Method to update default settings
  setDefaultSettings(containerSelector: string, appearTimeout: number = 5000): void {
    this.defaultContainerSelector = containerSelector;
    this.defaultAppearTimeout = appearTimeout;
    
    if (this.isBrowser) {
      console.log(`🔄 Default settings updated - Container: ${containerSelector}, Timeout: ${appearTimeout}ms`);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
/* this.swalService.success('Ticket created successfully!');
this.swalService.error('Failed to create ticket');
this.swalService.showLoading('Creating ticket...'); */