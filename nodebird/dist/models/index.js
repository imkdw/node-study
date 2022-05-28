"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Post = exports.Hashtag = exports.User = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var config_1 = require("../config/config");
var devConfig = config_1.config.development;
// db 정의
exports.sequelize = new sequelize_1.Sequelize(devConfig.database, devConfig.username, devConfig.password, {
    host: "localhost",
    dialect: "mysql"
});
// User Model 정의
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
User.init({
    email: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: true,
        unique: true
    },
    nick: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    provider: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "local"
    },
    snsId: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true
    }
}, {
    sequelize: exports.sequelize,
    timestamps: true,
    underscored: false,
    modelName: "User",
    tableName: "users",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci"
});
// Hashtag Model 정의
var Hashtag = /** @class */ (function (_super) {
    __extends(Hashtag, _super);
    function Hashtag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Hashtag;
}(sequelize_1.Model));
exports.Hashtag = Hashtag;
Hashtag.init({
    title: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: exports.sequelize,
    timestamps: true,
    underscored: false,
    modelName: "Hasgtag",
    tableName: "hasgtags",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
});
// Post Model 정의
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Post;
}(sequelize_1.Model));
exports.Post = Post;
Post.init({
    content: {
        type: sequelize_1.DataTypes.STRING(140),
        allowNull: false
    },
    img: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    }
}, {
    sequelize: exports.sequelize,
    timestamps: true,
    underscored: false,
    modelName: "Post",
    tableName: "posts",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
});
User.hasMany(Post);
User.belongsToMany(User, {
    foreignKey: "followingId",
    as: "Follwers",
    through: "Follow"
});
User.belongsToMany(User, {
    foreignKey: "followerId",
    as: "Follwings",
    through: "Follow"
});
Post.belongsTo(User);
Post.belongsToMany(Hashtag, { through: "PostHashtag" });
Hashtag.belongsToMany(Post, { through: "PostHashtag" });
//# sourceMappingURL=index.js.map