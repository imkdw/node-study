import React, { Component } from "react";

import Image from "../../../components/Image/Image";
import "./SinglePost.css";

class SinglePost extends Component {
  state = {
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const graphqlQuery = {
      query: `
        post(id: "${postId}") {
          title
          content
        }
      `,
    };
    console.log(graphqlQuery);
    fetch(`http://localhost:5000/graphql`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        // this.setState({
        //   title: resData.post.title,
        //   author: resData.post.creator.name,
        //   image: `http://localhost:5000/${resData.post.imageUrl}`,
        //   date: new Date(resData.post.createdAt).toLocaleDateString("en-US"),
        //   content: resData.post.content,
        // });
      })
      .catch((err) => {
        console.err(err);
      });
  }

  render() {
    console.log(this.state.image);
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
