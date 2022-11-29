import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Comment } from 'src/app/shared/interfaces/comment.interface';
import { PostService } from 'src/app/shared/services/post.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css'],
})
export class PostDialogComponent implements OnInit {
  post: Post;
  currentUser: User;
  commentText: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: Post; currentUser: User },
    private postDialogRef: MatDialogRef<PostDialogComponent>,
    private postService: PostService,
    private dialogService: DialogService
  ) {
    this.currentUser = data.currentUser;
    this.post = data.post;
  }

  ngOnInit(): void {
    this.postService.get().subscribe((res) => {
      const index = res.findIndex((post) => this.data.post._id === post._id);
      this.post = res[index];
      this.post = res.find((post) => post._id === this.data.post._id)!;
    });
  }
  submitComment() {
    this.postService
      .comment(this.post, this.currentUser, this.commentText)
      .subscribe();
    this.commentText = '';
  }
  deleteComment(post: Post, comment: Comment) {
    this.dialogService
      .confirmDialog('Are you sure to delete this comment ? ', () => {
        this.postService.deleteComment(post, comment).subscribe();
      })
      .subscribe();
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
  onDeletePost(post: Post) {
    this.dialogService
      .confirmDialog('Are you sure to delete this post ? ', () => {
        this.postService.delete(post).subscribe();
        this.postDialogRef.close();
      })
      .subscribe();
  }
  showLikes(likes: User[]) {
    return this.postService.showLikes(likes);
  }
  canDelete(comment: Comment) {
    return comment.author._id === this.currentUser._id;
  }
}
