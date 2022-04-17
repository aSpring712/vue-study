module.exports = (sequelize, DataTypes) => {
  // 해쉬태그 검색 기능이 존재하므로 따로 저장
  const Hashtag = sequelize.define('Hashtag', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  Hashtag.associate = (db) => { // ! 여기서의 db는 models/index.js에서 넣어준 db
    // N : M -> 하나의 게시글에 여러개의 해시태그, 하나의 해시태그에 여러개의 게시글
    db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'}); // belongsToMany -> 중간에 테이블이 하나 더 생기며 그 이름을 지정해주어야 함
  };

  return Hashtag;
};