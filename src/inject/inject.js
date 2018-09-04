window.browser = (function () {
    return window.msBrowser || window.browser || window.chrome;
})();
var BookmarksData = /** @class */ (function () {
    function BookmarksData() {
        this.modal = {};
        this.tweets = [];
        this.nextCursor = null;
        this.limit = 20;
        this.apiUrl = 'https://api.twitter.com/2/timeline/bookmark.json';
    }
    BookmarksData.prototype.fetchBookmarks = function (headers) {
        // check if last page is reached
        // hide load more button if last is reached
        var params = [
            "count=" + this.limit,
            "cursor=" + this.nextCursor
        ].join('&');
        var url = this.apiUrl + "?" + params;
        var h = new Headers();
        headers.forEach(function (o) { h.append(o.name, o.value); });
        var request = new Request(url, { headers: h });
        fetch(request, { credentials: 'same-origin' })
            .then(function (e) { return e.json(); })
            .then(function (e) {
            var tweets = e.globalObjects.tweets;
            console.log(tweets);
            //this.nextCursor = e.timeline.instructions["0"]
            //                        .addEntries.entries[this.limit+1]
            //                        .content.operation.cursor.value;
            //this.tweets = Object.keys(tweets).map((k)=>tweets[k]);
            // return these
            //putBookmarks({tweets: this.items, users: e.globalObjects.users}); 
        })["catch"](function (err) { console.log(err); });
    };
    BookmarksData.prototype.bookmarkaTweet = function (tweetid) {
    };
    return BookmarksData;
}());
var BookmarksDOM = /** @class */ (function () {
    function BookmarksDOM() {
        this.bd = new BookmarksData();
        this.watchHeaders();
        //this.placeNavButton();
    }
    //generateNavListItem(name: string, icon: string) : void{
    //  const li: HTMLElement = document.createElement('li');
    //  const a: HTMLElement = document.createElement('a');
    //  const spans: HTMLElement[] = [0,1].map((s)=>document.createElement('span'))
    //  // add classnames
    //  a.className = 'js-tooltip js-dynamic-tooltip global-bookmark-nav global-dm-nav'
    //  spans[0].className = `Icon Icon--${icon} Icon--large`
    //  spans[1].className = 'text'
    //  spans[1].innerText = name
    //  // apply changes
    //  li.addEventListener('click', this.bookmarksCTA, false)
    //  a.appendChild(spans[0])
    //  a.appendChild(spans[1])
    //  li.appendChild(a)
    //  const navUl: HTMLElement = document.querySelector('ul.nav');
    //  navUl.appendChild(li)
    //}
    // configure modal to show bookmarks
    // configureModal(){
    //   // hide dm modal
    //   setTimeout(function(){
    //     //document.elementFromPoint(0, 1).click();
    //   },5);
    //   // put the generated modal into the body
    //   const body = document.querySelector("body");
    //   bookmarks.modal = generateModal();
    //   body.appendChild(bookmarks.modal.modal_overlay);
    // }
    //bookmarksCTA(){
    //  this.configureModal()
    //  //displayBookmakrs()
    //}
    //placeNavButton(){ 
    //  this.generateNavListItem('Bookmarks','heartBadge');
    //}
    BookmarksDOM.prototype.watchHeaders = function () {
        // get auth details, remove dm class the second time(after getting all header) from out modal.
        window.browser.runtime.sendMessage({ funcName: 'getAuth' }, function (response) {
            console.log("* in inject.ts *");
            console.log(response.headers);
            console.log("* end inject.ts *");
            //this.bd.fetchBookmarks(response.headers);
        });
    };
    return BookmarksDOM;
}());
var ext = new BookmarksDOM();
