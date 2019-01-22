const { expect } = require('chai');
const sinon = require('sinon');

const Service = require('../src/service');
const service = new Service();

describe("Database", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("Should return the 'url' property of the first row", (done) => {
    const rows = [{ url: 'first url' }, { url: 'second url' }];
    const result = {
      rowCount: rows.length,
      rows
    };

    const db = sandbox.stub(service.db, 'query').returns(Promise.resolve(result));

    service.findUrl('code')
      .then((result) => {
        expect(db.calledOnce).to.be.true;
        expect(result).to.be.equals(rows[0].url);
        done();
      })
      .catch(done);
  });

  it("Should throw a 404 error if no rows are returned", (done) => {
    const rows = [];
    const result = {
      rowCount: rows.length,
      rows
    };

    const db = sandbox.stub(service.db, 'query').returns(Promise.resolve(result));

    service.findUrl('code')
      .then((result) => {
        done(new Error("Shouldn't have run the then callback"));
      })
      .catch((error) => {
        expect(db.calledOnce).to.be.true;
        expect(error.status).to.be.equals(404);
        done();
      });
  });
});