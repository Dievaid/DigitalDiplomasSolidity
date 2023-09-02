const DiplomaProvider = artifacts.require('./DiplomaProvider.sol');

contract('DiplomaProvider', (accounts) => {
    let diplomaProvider;

    before(async () => diplomaProvider = await DiplomaProvider.deployed());

    describe('deployment', async () => it('deploys successfully', async () => {
        const address = await diplomaProvider.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    }));

    describe('diplomas', async () => it ('creates diploma', async () => {
        let diplomaCountBeforeAdd, diplomaCountAfterAdd
        before(async () => {
            diplomaCountBeforeAdd = await diplomaProvider.diplomaCount();
            await diplomaProvider.createDiploma();
            diplomaCountAfterAdd = await diplomaProvider.diplomaCount();
            assert.equal(diplomaCountBeforeAdd + 1, diplomaCountAfterAdd);
        });
    }));
});