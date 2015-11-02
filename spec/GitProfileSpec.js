describe("GitProfileSpec", function() {
  var githubapi, request;
  var onSuccess, onFailure;

  beforeEach(function() {
    jasmine.Ajax.install();

    onSuccess = jasmine.createSpy('onSuccess');
    onFailure = jasmine.createSpy('onFailure');

    foursquare = new FoursquareVenueSearch();

    foursquare.search('40.019461,-105.273296', {
      onSuccess: onSuccess,
      onFailure: onFailure
    });

    request = jasmine.Ajax.requests.mostRecent();
    expect(request.url).toBe('venues/search');
    expect(request.method).toBe('POST');
    expect(request.data()).toEqual({latLng: ['40.019461, -105.273296']});
  });

  describe("on success", function() {
    beforeEach(function() {
      request.respondWith(TestResponses.search.success);
    });

    it("calls onSuccess with an array of Locations", function() {
      expect(onSuccess).toHaveBeenCalled();

      var successArgs = onSuccess.calls.mostRecent().args[0];

      expect(successArgs.length).toEqual(1);
      expect(successArgs[0]).toEqual(jasmine.any(Venue));
    });
  });
});