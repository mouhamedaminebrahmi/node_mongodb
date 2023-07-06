const utils = require("./utils");

/* 
.toBe(3)
.toEqual(array)
.toHaveLength(3);
.toHaveProperty("lemon")
.toBeCloseTo(0.3, 5)
.toBeGreaterThan(10)
.toBeGreaterThanOrEqual(12)
.toBeLessThan(20)
.toBeLessThanOrEqual(12)
.toBeNull()
.toBeUndefined()
.toBeNaN()
.toContain('lime')
.toMatch(new RegExp('grapefruit'))

*/

describe("Calculator tests", () => {
  test("adding 1 + 2 should return 3", () => {
    // arrange and act
    // assert
    expect(utils.sumNumber(0.1, 0.2)).toBeCloseTo(0.3, 5);
  });

  test("should be number", () => {
    expect(utils.sumNumber(1, 2)).toBe(3);
  });

  test("should first", () => {
    //verifie just a copy array
    const array = [1, 2, 3];
    expect(utils.cloneArray(array)).toEqual(array);
  });

  test("should first", () => {
    //verifie just a copy array
    const number = 5;
    expect(utils.checkFive(5)).toBe("5 is equal to 5.");
    expect(utils.checkFive(6)).toBe("6 is greater than 5.");
    expect(utils.checkFive(4)).toBe("4 is less than 5.");
  });

  test("should first", () => {
    expect(utils.getSurface(4, 4)).toBe(8);
    expect(utils.getSurface(2, 4)).toBe(4);
  });
});
