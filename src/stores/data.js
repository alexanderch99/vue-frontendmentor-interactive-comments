import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const startData = {
    currentUser: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    comments: [
      {
        id: 1,
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "1 month ago",
        score: 7,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "amyrobson",
        },
        replies: [],
        likes: ["hello", "world", "x", "y", "z", "a", "b", "c", "d"],
        dislikes: ["e", "f"],
      },
      {
        id: 2,
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: "2 weeks ago",
        score: -2,
        user: {
          image: {
            png: "./images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp",
          },
          username: "maxblagun",
        },
        replies: [
          {
            id: 3,
            content:
              "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: "1 week ago",
            score: 1,
            replyingTo: "maxblagun",
            user: {
              image: {
                png: "./images/avatars/image-ramsesmiron.png",
                webp: "./images/avatars/image-ramsesmiron.webp",
              },
              username: "ramsesmiron",
            },
            likes: ["hello", "world"],
            dislikes: ["a"],
          },
          {
            id: 4,
            content:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 1,
            replyingTo: "ramsesmiron",
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
            likes: ["hello"],
            dislikes: [],
          },
        ],
        likes: ["hello"],
        dislikes: ["world", "a", "b"],
      },
    ],
  };

  const data = ref();

  (() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(startData));
    }
    data.value = JSON.parse(localStorage.getItem("data"));
  })();

  watch(data.value, (newVal, oldVal) => {
    localStorage.setItem("data", JSON.stringify(data.value));
  });

  const getCurrentUser = () => data.value.currentUser;
  const getComments = () => data.value.comments;
  const addComment = comment => data.value.comments.push(comment);
  const addReply = (comment, reply) => comment.replies.push(reply);
  const editComment = (comment, newContent) => {
    comment.content = newContent;
  };
  const deleteComment = (mainComment, id) => {
    const index = (mainComment?.replies || data.value.comments).findIndex(
      el => el.id == id,
    );
    (mainComment?.replies || data.value.comments).splice(index, 1);
  };
  const addLike = comment => {
    const username = getCurrentUser().username;

    if (!comment.likes.includes(username)) {
      comment.likes.push(username);
    } else {
      comment.likes.splice(comment.likes.indexOf(username), 1);

      setScore(comment);

      return;
    }
    if (comment.dislikes.includes(username)) {
      comment.dislikes.splice(comment.dislikes.indexOf(username), 1);
    }

    setScore(comment);
  };
  const addDislike = comment => {
    const username = getCurrentUser().username;

    if (!comment.dislikes.includes(username)) {
      comment.dislikes.push(username);
    } else {
      comment.dislikes.splice(comment.dislikes.indexOf(username), 1);

      setScore(comment);

      return;
    }
    if (comment.likes.includes(username)) {
      comment.likes.splice(comment.likes.indexOf(username), 1);
    }

    setScore(comment);
  };
  const checkLike = computed(
    comment => comment => comment.likes.includes(getCurrentUser().username),
  );
  const checkDislike = computed(
    comment => comment => comment.dislikes.includes(getCurrentUser().username),
  );

  function setScore(comment) {
    comment.score = comment.likes.length - comment.dislikes.length;
  }

  const isItMe = user => getCurrentUser().username == user;

  return {
    data,
    startData,
    getCurrentUser,
    getComments,
    addComment,
    addReply,
    editComment,
    deleteComment,
    addLike,
    addDislike,
    checkLike,
    checkDislike,
    isItMe,
  };
});
