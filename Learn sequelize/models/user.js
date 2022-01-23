const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,

      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      craete_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }, {
      sequelize, // static init 매개변수와 연결되는 옵션, db.sequelize 객체를 넣어야함
      timestamps: false, // true로 하게되면 sequelize가 createAt, updatedAt 컬럼을 추가함. users 테이블은 create_at을 추가했으므로 false처리
      underscored: false, // sequelize는 기본적으로 테이블, 컬렴을 camelCase로 만들게 된다. 해당 옵션을 true로 설정시 snake_case로 바꿔준다/
      modelName: 'User', // 모델 이름을 지정할 수 있다. 노드 프로젝트에서 사용된다.
      tableName: 'users', // 실제 db의 테이블명이다. 기본적으로 테이블명은 모델네임의 소문자+복수형으로 만들어진다. User -> users
      paranoid: false, // true로 설정시 deletedAt 컬럼이 생긴다. 로우를 삭제해도 완전히 삭제되지 않고 deletedAt에 지운시간이 기록된다.
      // 한글이 안깨지긴 위해선 각각 utf8, utf8_general_ci로 설정해야 한다.
      // 이모티콘도 사용할려면 utf8mb4, utf8mb4_general_ci를 입력하면 된다.
      charset: 'utf8',
      collate: 'utf_general_ci'
    });
  }
  static associations(db) { }
};