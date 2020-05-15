import {observable, action} from 'mobx';
import { DB_CONFIG } from '../config/config';
import firebase from 'firebase/app';
import 'firebase/database';

class Store {
	@observable posts = [];
  @observable inputItem = null;
	@observable app = firebase.initializeApp(DB_CONFIG);
  @observable database = this.app.database().ref().child('posts');
	

	@action addPost(post){
		this.database.push().set({postContent: post});
	}
	@action removePost(postId){
  	this.database.child(postId).remove();
	}
	@action editPost(postId, post){
		this.database.child(postId).update({postContent: post});
	}
}
const store = new Store();

export default store;