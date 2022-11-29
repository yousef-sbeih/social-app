import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PostService } from 'src/app/shared/services/post.service';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[];
  postsSub: Subscription;
  @Input() currentUser: User;

  constructor(
    private postService: PostService,
    private matDialog: MatDialog,
    public routingService: RoutingService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.postsSub = this.postService.get().subscribe((res) => {
      this.posts = res;
    });
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
  onLikeClickAction(post: Post) {
    this.isLikePost(post) ? this.unLikePost(post) : this.likePost(post);
  }
  likePost(post: Post) {
    this.postService.like(post, this.currentUser).subscribe();
  }
  unLikePost(post: Post) {
    this.postService.unLike(post, this.currentUser).subscribe();
  }
  isLikePost(post: Post) {
    return this.postService.isLikePost(post, this.currentUser);
  }
  showLikes(likes: User[]) {
    return this.postService.showLikes(likes);
  }
  openListDialog(users: User[]) {
    this.matDialog.open(UsersListComponent, {
      width: '20%',
      height: '30%',
      data: users,
    });
  }
  openPostDialog(post: Post) {
    this.matDialog.open(PostDialogComponent, {
      width: '60%',
      height: '70%',
      data: { post: post, currentUser: this.currentUser },
    });
  }

  onDeletePost(post: Post) {
    this.dialogService
      .confirmDialog('Are you sure to delete this post ? ', () => {
        this.postService.delete(post).subscribe();
      })
      .subscribe();
  }

  onEditPost(post: Post) {}
}
