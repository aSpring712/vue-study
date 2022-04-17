module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.Text,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8_general_ci',
  });

  Comment.associate = (db) => { // ! 여기서의 db는 models/index.js에서 넣어준 db
    db.Comment.belongsTo(db.User); // 사람이 댓글 작성
    db.Comment.belongsTo(db.Post); // 게시글에 댓글 작성
  };

  return Comment;
};