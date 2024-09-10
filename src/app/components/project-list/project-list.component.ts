import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-list',
  template: `
    <div class="container mx-auto mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Projects</h2>
        <button 
          (click)="openCreateModal()"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Project
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let project of projects" class="bg-white p-4 rounded shadow">
          <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
          <p class="text-gray-600 mb-4">{{ project.description }}</p>
          <a [routerLink]="['/projects', project.id]" class="text-blue-600 hover:underline">View Details</a>
        </div>
      </div>

      <div *ngIf="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-xl font-bold mb-4">Create Project</h2>
          
          <form (ngSubmit)="submitProject()">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" [(ngModel)]="newProject.title" name="title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none">
            </div>
            
            <div class="mb-4">
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" [(ngModel)]="newProject.description" name="description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none"></textarea>
            </div>

            <div class="flex justify-end">
              <button type="button" (click)="closeCreateModal()" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">Cancel</button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  isModalOpen = false;
  newProject = { title: '', description: '' };

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects,
      error => {
        console.error('Failed to load projects', error);
        this.toastr.error('Failed to load projects. Please try again.', 'Error');
      }
    );
  }

  openCreateModal() {
    this.isModalOpen = true;
  }

  closeCreateModal() {
    this.isModalOpen = false;
    this.newProject = { title: '', description: '' };
  }

  submitProject() {
    if (this.newProject.title && this.newProject.description) {
      this.projectService.createProject(this.newProject).subscribe(
        response => {
          console.log('Project created successfully', response);
          this.toastr.success('Project created successfully!', 'Success');
          this.loadProjects();
          this.closeCreateModal();
        },
        error => {
          console.error('Failed to create project', error);
          this.toastr.error('Failed to create project. Please try again.', 'Error');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    }
  }
}
