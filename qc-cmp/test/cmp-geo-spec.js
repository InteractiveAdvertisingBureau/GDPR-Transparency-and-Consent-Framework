import cmpGeo from '../src/cmp-geo';

describe('CMP Geo', function() {
  var timer;
  beforeEach(function() {
    timer = jasmine.createSpy('timer');
    jasmine.clock().install();

    //common spies
    spyOn(cmpGeo, 'fetchIsUserInEU').and.callFake(function(cb, arg) {
      setTimeout(function() {
        cmpGeo.setUserInEU(true);
        cb(true, arg);
      }, 200);
    });
  });

  afterEach(function() {
    jasmine.clock().uninstall();
    cmpGeo.setUserInEU(null);
  });

  describe('checkUserIsInEU', function() {
    var cb1 = jasmine.createSpy('callback 1');
    var cb2 = jasmine.createSpy('callback 2');
    var cb3 = jasmine.createSpy('callback 3');

    it('calls the callbacks in the correct order', function() {
      //call the function with callback1
      cmpGeo.checkUserIsInEU(cb1);
      expect(cmpGeo.fetchIsUserInEU.calls.count()).toEqual(1);
      jasmine.clock().tick(101);
      expect(cb1).not.toHaveBeenCalled();

      //call again with a diff callback. This should just add to callbacks array
      cmpGeo.checkUserIsInEU(cb2);
      expect(cb2).not.toHaveBeenCalled();

      jasmine.clock().tick(201);
      //its past 200ms. This should've called the fake fetchIsUserInEU and set isUserInEU

      expect(cb1).toHaveBeenCalled();
      expect(cb2).toHaveBeenCalled();
      expect(cmpGeo.fetchIsUserInEU.calls.count()).toEqual(1);

      //now the isUserInEU is already set. So this should not call fetchIsUserInEU and be called immediately
      cmpGeo.fetchIsUserInEU.calls.reset();
      cmpGeo.checkUserIsInEU(cb3);
      expect(cb3).toHaveBeenCalled();
      expect(cmpGeo.fetchIsUserInEU).not.toHaveBeenCalled();
    });

    it('calls the callbacks with the correct value', function() {
      //call the function with callback1
      cmpGeo.checkUserIsInEU(cb1);
      jasmine.clock().tick(201);
      //its past 200ms. This should've called the fake fetchIsUserInEU and set isUserInEU

      expect(cb1).toHaveBeenCalled();
      expect(cb1).toHaveBeenCalledWith(true);

      //reset it
      cmpGeo.isUserInEU = false;
      cmpGeo.checkUserIsInEU(cb3);
      expect(cb3).toHaveBeenCalled();
      expect(cb3).toHaveBeenCalledWith(false);
    });
  });
});
