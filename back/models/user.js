module.exports = (sequelize, DataTypes) => { // sequelize와 DataTypes를 매개변수로 가지는 함수를 모듈로 만들었다.
    // 노드에서는 각 파일이 다 모듈 역할 -> 웬만하면 module.exports

    const User = sequelize.define('User', { // User라는 테이블(db 입장) 즉, 모델(sequelize 입장)을 만들 것
        // 데이터 정의
        email: {
            // 더 상세하게 정의
            type: DataTypes.STRING(40), // 문자열 40자 이내로 정의
            allowNull: false, // 필수
            unique: true, // 중복 금지
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, { // 세번째 인수 : 테이블에 대한 설정
        charset: 'utf8',
        collate: 'utf8_general_ci', // for 한글 저장
    });

    // 이렇게 하면, 자동으로 고유 id, createdAt, updatedAt을 생성해 줌

    // 모델간 관계를 적어주는 부분
    User.associate = (db) => {
        // 1명의 사용자 -> 여러개의 게시글 작성 가능 ( 1 : N )
        db.User.hasMany(db.Post); // 이렇게 적어주고, post.js에서는 db.Post.belongsTo(db.User); 추가 필요
        db.User.hasMany(db.Comment); // * hasMany는 따로 생성해주는 column은 없으나, 이 유저가 쓴 게시글 다 불러와 또는 이 게시글 쓴 사람 알아와 등 가능
    };
    return User;
};