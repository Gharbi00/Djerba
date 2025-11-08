import { Component } from '@angular/core';
import { PaginationService } from '../../../shared/pagination/pagination.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule,PaginationComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  perPage = 3;
  totalPages: number = 3;
  blogs = [
    {
      id: 1,
      title: 'Paris blockchain summit new slogan',
      author: 'Adam Hirachin',
      comments: 3,
      month: 'Aug',
      year: 2022,
      image: 'images/blog_img_1.jpg',
      content:
        'We’re inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, especially for the companies scaling out their sales operations. That’s why Attentive was born in 2015.',
      bgColor: 'bg-orange',
    },
    {
      id: 2,
      title: 'How blockchain will change the world',
      author: 'Jane Doe',
      comments: 5,
      month: 'Sep',
      year: 2022,
      image: 'images/blog_img_2.jpg',
      content:
        'Blockchain technology has the potential to revolutionize industries by ensuring secure and transparent transactions, especially in finance, healthcare, and supply chain management.',
      bgColor: 'bg-pink',
    },
    {
      id: 3,
      title: 'The future of AI and Blockchain',
      author: 'John Smith',
      comments: 7,
      month: 'Oct',
      year: 2022,
      image: 'images/blog_img_3.jpg',
      content:
        'AI and blockchain are emerging as powerful tools for innovation. Their combination offers opportunities to create smarter, more secure systems for various applications.',
      bgColor: 'bg-blue',
    },

    {
      id: 4,
      title: 'Paris blockchain summit new slogan',
      author: 'Adam Hirachin',
      comments: 3,
      month: 'Aug',
      year: 2022,
      image: 'images/blog_img_1.jpg',
      content:
        'We’re inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, especially for the companies scaling out their sales operations. That’s why Attentive was born in 2015.',
      bgColor: 'bg-orange',
    },
    {
      id: 5,
      title: 'How blockchain will change the world',
      author: 'Jane Doe',
      comments: 5,
      month: 'Sep',
      year: 2022,
      image: 'images/blog_img_2.jpg',
      content:
        'Blockchain technology has the potential to revolutionize industries by ensuring secure and transparent transactions, especially in finance, healthcare, and supply chain management.',
      bgColor: 'bg-pink',
    },
    {
      id: 6,
      title: 'The future of AI and Blockchain',
      author: 'John Smith',
      comments: 7,
      month: 'Oct',
      year: 2022,
      image: 'images/blog_img_3.jpg',
      content:
        'AI and blockchain are emerging as powerful tools for innovation. Their combination offers opportunities to create smarter, more secure systems for various applications.',
      bgColor: 'bg-blue',
    },
    {
      id: 7,
      title: 'Paris blockchain summit new slogan',
      author: 'Adam Hirachin',
      comments: 3,
      month: 'Aug',
      year: 2022,
      image: 'images/blog_img_1.jpg',
      content:
        'We’re inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, especially for the companies scaling out their sales operations. That’s why Attentive was born in 2015.',
      bgColor: 'bg-orange',
    },
    {
      id: 8,
      title: 'How blockchain will change the world',
      author: 'Jane Doe',
      comments: 5,
      month: 'Sep',
      year: 2022,
      image: 'images/blog_img_2.jpg',
      content:
        'Blockchain technology has the potential to revolutionize industries by ensuring secure and transparent transactions, especially in finance, healthcare, and supply chain management.',
      bgColor: 'bg-pink',
    },
    {
      id: 9,
      title: 'The future of AI and Blockchain',
      author: 'John Smith',
      comments: 7,
      month: 'Oct',
      year: 2022,
      image: 'images/blog_img_3.jpg',
      content:
        'AI and blockchain are emerging as powerful tools for innovation. Their combination offers opportunities to create smarter, more secure systems for various applications.',
      bgColor: 'bg-blue',
    },
  ];



  pagesToBeShown = Math.ceil(this.blogs.length / 3);

  constructor(private paginationService: PaginationService) { }

  getSlice(): any[] {
    const startIndex = (this.paginationService.actualPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    console.log(this.pagesToBeShown, "pages to be shown");
    console.log(this.paginationService.actualPage, 'actual page');
    return this.blogs.slice(startIndex, endIndex);

  }

}
