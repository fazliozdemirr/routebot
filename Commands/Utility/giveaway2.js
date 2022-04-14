"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Database = require("@replit/database");
var discord_js_1 = require("discord.js");
var db = new Database();
var client = require("../../index").client;
var giveaways;
var keyLookupGiveaway;
module.exports = {
    name: "giveaway2",
    aliases: ["Giveaway2"],
    description: "Start a giveaway!",
    run: function (client, message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, price, time, end, endDate, role, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!message.member.permissions.has("KICK_MEMBERS"))
                            return [2, message.channel.send({
                                    content: "You do not have the permission to host giveaways!",
                                })];
                        channel = message.mentions.channels.first();
                        if (!channel) {
                            return [2, message.channel.send({
                                    embeds: [
                                        new discord_js_1.MessageEmbed()
                                            .setTitle("Giveaway")
                                            .setColor("RED")
                                            .setDescription("Wrong command usage!\n\nCommand Usage: `!giveaway2 <#channel> <time> <winners> <prize>`"),
                                    ],
                                })];
                        }
                        if (!args[1]) {
                            return [2, message.channel.send({
                                    embeds: [
                                        new discord_js_1.MessageEmbed()
                                            .setTitle("Giveaway")
                                            .setColor("RED")
                                            .setDescription("Wrong command usage!\n\nCommand Usage: `!giveaway2 <#channel> <time> <winners> <prize>`"),
                                    ],
                                })];
                        }
                        if (!args[2] || isNaN(parseInt(args[2]))) {
                            return [2, message.channel.send({
                                    embeds: [
                                        new discord_js_1.MessageEmbed()
                                            .setTitle("Giveaway")
                                            .setColor("RED")
                                            .setDescription("Wrong command usage!\n\nCommand usage: `!giveaway2 <#channel> <time> <winners> <prize>`"),
                                    ],
                                })];
                        }
                        if (!args[3]) {
                            return [2, message.channel.send({
                                    embeds: [
                                        new discord_js_1.MessageEmbed()
                                            .setTitle("Giveaway")
                                            .setColor("RED")
                                            .setDescription("Wrong command usage!\n\nUCommand usage: `!giveaway2 <#channel> <time> <winners> <prize>`"),
                                    ],
                                })];
                        }
                        price = args.slice(3).join(" ");
                        price = price.slice(0, 250);
                        time = this.parseMillis(args[1]);
                        if (time < 1) {
                            return [2, message.channel.send({
                                    embeds: [
                                        new discord_js_1.MessageEmbed()
                                            .setTitle("Giveaway")
                                            .setColor("RED")
                                            .setDescription("Wrong command usage!\n\nCommamd usage: `-giveaway2 <#channel> <time> <winners> <prize>`"),
                                    ],
                                })];
                        }
                        end = Date.now() + time;
                        endDate = Math.round(end / 1000);
                        return [4, this.getRole(message)];
                    case 1:
                        role = _a.sent();
                        return [4, channel.send({
                                embeds: [
                                    new discord_js_1.MessageEmbed()
                                        .setTitle("Giveaway")
                                        .setColor("#12c4ff")
                                        .setDescription("React with \uD83C\uDF89 to enter!")
                                        .addField("Prize", "".concat(price))
                                        .addField("Winners", args[2])
                                        .addField("Ends", "<t:".concat(endDate, ":R>"))
                                        .addField("Role Required", "".concat(role))
                                        .setTimestamp()
                                        .setFooter({
                                        text: "Giveaway hosted by " + message.author.tag,
                                        iconURL: message.author.avatarURL(),
                                    }),
                                ],
                            })];
                    case 2:
                        msg = _a.sent();
                        return [4, msg.react("🎉")];
                    case 3:
                        _a.sent();
                        db.set("giveaway_".concat(msg.id), {
                            price: price,
                            end: end,
                            winners: parseInt(args[2]),
                            channel: message.channel.id,
                            message: msg.id,
                            active: true,
                            role: role.id,
                        });
                        giveaways.push({
                            price: price,
                            end: end,
                            winners: parseInt(args[2]),
                            channel: message.channel.id,
                            message: msg.id,
                            active: true,
                            role: role.id,
                        });
                        keyLookupGiveaway.set(msg.id, {
                            price: price,
                            end: end,
                            winners: parseInt(args[2]),
                            channel: message.channel.id,
                            message: msg.id,
                            active: true,
                            role: role.id,
                        });
                        return [2];
                }
            });
        });
    },
    parseMillis: function (str) {
        var result = 0;
        var regex = /(\d+)([dhms])/g;
        var match;
        while ((match = regex.exec(str))) {
            var num = parseInt(match[1]);
            var unit = match[2];
            switch (unit) {
                case "d":
                    result += num * 86400000;
                    break;
                case "h":
                    result += num * 3600000;
                    break;
                case "m":
                    result += num * 60000;
                    break;
                case "s":
                    result += num * 1000;
                    break;
                case "ms":
                    result += num;
                    break;
            }
        }
        return result;
    },
    getRole: function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, role, a, mes, roleA, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, message.channel.send({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setTitle("Giveaway")
                                    .setColor("#12c4ff")
                                    .setDescription("What role do you need to enter the giveaway? Mention a role or it's id if you want to specify or leave type `none`."),
                            ],
                        })];
                    case 1:
                        msg = _a.sent();
                        role = message.guild.roles.everyone;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, msg.channel.awaitMessages({
                                filter: function (m) { return m.author.id === message.author.id; },
                                max: 1,
                                time: 60000,
                            })];
                    case 3:
                        a = _a.sent();
                        mes = a.first();
                        roleA = mes.mentions.roles.first() || mes.guild.roles.cache.get(mes.content);
                        if (!roleA) {
                            throw new Error("No role found!");
                        }
                        role = roleA;
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        msg.edit({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setTitle("Giveaway")
                                    .setColor("#12c4ff")
                                    .setDescription("No proper role was mentioned!\n\nUsing `@everyone` as the role."),
                            ],
                        });
                        return [3, 5];
                    case 5: return [2, role];
                }
            });
        });
    },
};
Array.prototype["random"] = function (count) {
    if (count === void 0) { count = 1; }
    if (count > 1) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push(this[Math.floor(Math.random() * this.length)]);
        }
        return arr;
    }
    return this[Math.floor(Math.random() * this.length)];
};
(function loadRightNow() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, db.list("giveaway")];
                case 1:
                    giveaways = _c.sent();
                    _b = (_a = Promise).all;
                    return [4, db.list("giveaway")];
                case 2: return [4, _b.apply(_a, [(_c.sent()).map(function (a) { return db.get(a); })])];
                case 3:
                    giveaways = (_c.sent()).filter(function (giveaway) { return giveaway.active && giveaway.end <= Date.now(); });
                    keyLookupGiveaway = new Map(giveaways.map(function (giveaway) { return [giveaway.message, giveaway]; }));
                    return [2];
            }
        });
    });
})();
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _loop_1, _i, giveaways_1, giveaway, state_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("calling..");
                _b = (_a = Promise).all;
                return [4, db.list("giveaway")];
            case 1: return [4, _b.apply(_a, [(_c.sent()).map(function (a) { return db.get(a); })])];
            case 2:
                giveaways = (_c.sent()).filter(function (giveaway) { return giveaway.active && giveaway.end <= Date.now(); });
                _loop_1 = function (giveaway) {
                    var msg, winners, winnerCount, users;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4, client.channels
                                    .fetch(giveaway.channel)
                                    .then(function (channel) {
                                    return channel.messages.fetch(giveaway.message);
                                })
                                    .catch(function (err) {
                                          console.log(err)
                                    })];
                            case 1:
                                msg = _d.sent();
                                if (!msg || !msg.editable) {
                                    db.delete("giveaway_".concat(giveaway.message));
                                    return [2, { value: void 0 }];
                                }
                                return [4, msg.reactions.resolve("🎉").users.fetch()];
                            case 2:
                                winners = (_d.sent()).filter(function (u) { return !u.bot; });
                                winnerCount = winners.size;
                                if (winnerCount < giveaway.winners) {
                                    winners = [];
                                }
                                users = winners.random(winnerCount);
                                return [4, msg.edit({
                                        embeds: [
                                            new discord_js_1.MessageEmbed()
                                                .setTitle("Giveaway Ended")
                                                .setColor("#7289DA")
                                                .addField("Prize", "".concat(giveaway.price))
                                                .addField("Winners", users
                                                ? users.map(function (u) { return "<@".concat(u.id, ">"); }).join(", ")
                                                : "Not enough participants!")
                                                .setTimestamp()
                                                .setFooter({
                                                text: "Ended at" + new Date(giveaway.end).toLocaleString(),
                                                iconURL: msg.author.avatarURL(),
                                            }),
                                        ],
                                    })];
                            case 3:
                                _d.sent();
                                db.delete("giveaway_".concat(giveaway.message));
                                return [4, msg.reply({
                                        content: "\uD83C\uDF89 **Giveaway ended!** \uD83C\uDF89\n\nWinners: ".concat(users
                                            ? users.map(function (u) { return "<@".concat(u.id, ">"); })
                                            : "Not enough participants!"),
                                    })];
                            case 4:
                                _d.sent();
                                return [2];
                        }
                    });
                };
                _i = 0, giveaways_1 = giveaways;
                _c.label = 3;
            case 3:
                if (!(_i < giveaways_1.length)) return [3, 6];
                giveaway = giveaways_1[_i];
                return [5, _loop_1(giveaway)];
            case 4:
                state_1 = _c.sent();
                if (typeof state_1 === "object")
                    return [2, state_1.value];
                _c.label = 5;
            case 5:
                _i++;
                return [3, 3];
            case 6: return [2];
        }
    });
}); }, 1000 * 30);
client.on("messageReactionAdd", function (reaction, user) { return __awaiter(void 0, void 0, void 0, function () {
    var giveaway;
    return __generator(this, function (_a) {
        if (!keyLookupGiveaway.has(reaction.message.id))
            return [2]; 
        giveaway = keyLookupGiveaway.get(reaction.message.id);
        console.log(giveaway);
        if (user.bot)
            return [2];
        if (user.id === reaction.message.author.id)
            return [2];
        if (!giveaway.active)
            return [2];
        if (!reaction.message.guild)
            return [2];
        if (!user.roles.cache.has(giveaway.role.id)) {
            reaction.remove();
            return [2];
        }
        return [2];
    });
}); });
//# sourceMappingURL=index.js.map