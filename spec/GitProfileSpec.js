describe("mocking ajax", function() {

  describe("suite wide usage", function() {

    beforeEach(function() {
      jasmine.Ajax.install();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it("specifying response when you need it", function() {
      var doneFn = jasmine.createSpy("success");

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(args) {
        if (this.readyState == this.DONE) {
          doneFn(this.responseText);
        }
      };

      xhr.open("GET", "/some/cool/url");
      xhr.send();

        "status": 200,

        "contentType": 'application/json',

        "responseText": '{
  "login": "chrisco",
  "id": 37781,
  "avatar_url": "https://avatars.githubusercontent.com/u/37781?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/chrisco",
  "html_url": "https://github.com/chrisco",
  "followers_url": "https://api.github.com/users/chrisco/followers",
  "following_url": "https://api.github.com/users/chrisco/following{/other_user}",
  "gists_url": "https://api.github.com/users/chrisco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/chrisco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/chrisco/subscriptions",
  "organizations_url": "https://api.github.com/users/chrisco/orgs",
  "repos_url": "https://api.github.com/users/chrisco/repos",
  "events_url": "https://api.github.com/users/chrisco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/chrisco/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Christopher Comella",
  "company": "linkedin.com/in/comella",
  "blog": "http://twitter.com/chrisco",
  "location": "Boulder | Denver | Fort Collins | Washington DC | Sweden",
  "email": null,
  "hireable": true,
  "bio": null,
  "public_repos": 28,
  "public_gists": 1,
  "followers": 6,
  "following": 35,
  "created_at": "2008-12-02T13:22:44Z",
  "updated_at": "2015-10-24T20:31:04Z"
}
'
      });
¶
Now that we’ve told the request to respond, our callback gets called.

      expect(doneFn).toHaveBeenCalledWith('awesome response');
    });
¶
You can also specify responses ahead of time and they will respond immediately when the request is made.

    it("allows responses to be setup ahead of time", function () {
      var doneFn = jasmine.createSpy("success");
¶
Call stubRequest with the url you want to return immediately. Then andReturn receives the same type of argument as response

      jasmine.Ajax.stubRequest('/another/url').andReturn({
        "responseText": 'immediate response'
      });
¶
Make your requests as normal

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(args) {
        if (this.readyState == this.DONE) {
          doneFn(this.responseText);
        }
      };

      xhr.open("GET", "/another/url");
      xhr.send();

      expect(doneFn).toHaveBeenCalledWith('immediate response');
    });
  });
¶
If you only want to use it in a single spec, you can use withMock. withMock takes a function that will be called after ajax has been mocked, and the mock will be uninstalled when the function completes.

  it("allows use in a single spec", function() {
    var doneFn = jasmine.createSpy('success');
    jasmine.Ajax.withMock(function() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(args) {
        if (this.readyState == this.DONE) {
          doneFn(this.responseText);
        }
      };

      xhr.open("GET", "/some/cool/url");
      xhr.send();

      expect(doneFn).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().response({
        "status": 200,
        "responseText": 'in spec response'
      });

      expect(doneFn).toHaveBeenCalledWith('in spec response');
    });
  });
});