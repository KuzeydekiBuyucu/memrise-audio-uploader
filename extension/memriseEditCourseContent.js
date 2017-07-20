var WordRow = function (element) {
    this.$element = $(element);

    this.word = this.$element
        .find('td.cell.text.column[data-key="1"]')
        .find('div.text')
        .text();

    this.$audioCell = this.$element.find('td.cell.audio.column');

    var $audiosMenu = this.$audioCell.find('div.dropdown-menu.audios');
    this.hasSound = $audiosMenu.length && $audiosMenu.children().length > 0;

    this.thingId = this.$element.attr('data-thing-id');
};

WordRow.prototype.replaceAudioCell = function(html) {
    this.$audioCell.replaceWith($(html));
};

WordRow.prototype.uploadSound = function(sound) {
    var data = new FormData();
    data.append('file.mp3', sound);
    data.append('thing_id', this.thingId);

    var ajaxOptions = {
        url: 'https://www.XXXmemrise.com/ajax/thing/cell/upload_file/',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
            console.log(data);
        }
    };

    var event = document.createEvent("CustomEvent");
    event.initCustomEvent("mau-send-ajax", true, true, ajaxOptions);
    document.dispatchEvent(event);
    // document.dispatchEvent(new CustomEvent(
    //     'mau-send-ajax',
    //     {
    //         detail: ajaxOptions
    //     }));
};

var MemriseCourse = function () {
    this.rows = undefined;
    this.middlewareToken = undefined;
};

MemriseCourse.prototype.readRows = function () {
    var $rows = $('table.level-things.table').find('tr.thing');
    this.rows = [];

    $rows.each(function (index, $row) {
        this.rows.push(new WordRow($row));
    }.bind(this));

    this.rows[2].uploadSound('awdawdaw');
};

MemriseCourse.prototype.grabMemriseToken = function () {
    document.addEventListener('mau-set-memrise-token', function (event) {
        this.middlewareToken = event.detail;
    }.bind(this));

    var th = document.getElementsByTagName('body')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', chrome.extension.getURL('pageInjectedScript.js'));
    th.appendChild(s);
};

var memriseCourse = new MemriseCourse();
memriseCourse.grabMemriseToken();