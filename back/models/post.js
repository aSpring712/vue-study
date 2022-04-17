module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // 모델명은 대문자 단수형, 테이블명은 소문자 복수형으로 많이 씀
    content: {
      type: DataTypes.TEXT, // 길이를 딱히 특정할 수 없는 매우 긴 글(길이 제한 X)
      allowNull: false,
    }, // createdAt, updatedAt은 자동생성
  }, {
    charset: 'utf8mb4', // utf8 한글, mb4 이모티콘
    collate: 'utf8mb4_general_ci',
  });

  Post.associate = (db) => {
    // 게시글은 사용자에게 속해있다.
    db.Post.belongsTo(db.User); // user.js -> db.User.hasMany(db.Post);
    // * belongsTo -> UserId가 column에 추가됨 -> 이것을 통해 누가 쓴 글인지 알 수 있게 됨
    // belongsTo -> 사람을 통해 게시글 불러오는 것 가능
    // hasMany -> 게시글을 통해 글을 쓴 사람을 불러올 수 있음 (양방향)

    db.Post.hasMany(db.Comment); // 게시글을 통해 댓글을 가져옴
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'}); // N:M 관계
  };

  return Post;
};