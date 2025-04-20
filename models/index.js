// Module SYSTEM - Master Data
const md100Users = require('./system/md_100_users');


// Module Line Message API
const line100LineChannels = require('./lineMessageAPI/line_100_line_channels');
const line101LineGroups = require('./lineMessageAPI/line_101_line_groups');
const line102LineUrlApi = require('./lineMessageAPI/line_102_line_url_api');
const line104LineEventLogs = require('./lineMessageAPI/line_104_line_event_logs');
const line105LinePushLogs = require('./lineMessageAPI/line_105_line_push_logs');

module.exports = {
    md100Users,

    line100LineChannels,
    line101LineGroups,
    line102LineUrlApi,
    line104LineEventLogs,
    line105LinePushLogs
}