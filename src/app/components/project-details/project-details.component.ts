import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details',
  template: `
    <div class="container mx-auto mt-8" *ngIf="project">
      <h2 class="text-2xl font-bold mb-4">{{ project.title }}</h2>
      <p class="text-gray-600 mb-4">{{ project.description }}</p>
      <a routerLink="/create-bid" [queryParams]="{projectId: project.id}" class="bg-blue-600 text-white px-4 py-2 rounded">Place Bid</a>
    </div>
  `,
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class ProjectDetailsComponent implements OnInit {
  project: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProject(id).subscribe(
        project => this.project = project,
        error => console.error('Failed to load project details', error)
      );
    }
  }
}