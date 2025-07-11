import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertInput } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {

    // Regular alerts
    showAlert(
        title: string,
        text: string,
        icon: SweetAlertIcon = 'info',
        options?: Partial<SweetAlertOptions>
    ) {
        return Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true
        });
    }

    // Confirmation dialog
    showConfirm(
        title: string,
        text: string,
        confirmButtonText = 'Yes',
        cancelButtonText = 'Cancel',
        icon: SweetAlertIcon = 'warning',
        options?: Partial<SweetAlertOptions>
    ): Promise<boolean> {
        return Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true
        }).then(result => result.isConfirmed);
    }

    // Separate method for file input alert
    showFileInputAlert(
        title: string,
        inputValidator?: (file: File | FileList | null) => string | false | void | Promise<string | false | void>,
        options?: Omit<SweetAlertOptions, 'input' | 'title' | 'inputValidator'>
    ) {
        return Swal.fire({
            title,
            input: 'file',
            inputValidator,
            ...options,
        });
    }
}
