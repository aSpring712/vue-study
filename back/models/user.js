module.exports = (sequelize, DataTypes) => { // sequelize와 DataTypes를 매개변수로 가지는 함수를 모듈로 만들었다.
    // 노드에서는 각 파일이 다 모듈 역할 -> 웬만하면 module.exports

    const User = sequelize.define('User', { // User라는 테이블(db 입장) 즉, 모델(sequelize 입장)을 만들 것
        // 데이터 정의
        email: {
            // 더 상세하게 정의
            type: DataTypes.STRING(40), // 문자열 40자 이내로 정의
            allowNull: false, // 필수
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
    User.associate = (db) => {

    };
    return User;
};