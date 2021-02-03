const nearAPI = require('near-api-js');
const testUtils = require('./test-utils');
const getConfig = require('../src/config');

const { Account } = nearAPI;
const { 
	connection, initContract, getAccount, getContract,
	contractName, 
	contractBName
} = testUtils;
const { GAS } = getConfig();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('deploy contract ' + contractName, () => {
	let alice;
        
	console.log('contractBName', contractBName);

	beforeAll(async () => {
		alice = await getAccount();
		await initContract(true);
	});

	test('contract hash', async () => {
		let state = (await new Account(connection, contractName)).state();
		expect(state.code_hash).not.toEqual('11111111111111111111111111111111');
	});

	test('check balance is enough', async () => {
		const contract = await getContract(alice);

		const result = await contract.check_balance_contract_b({ contract_a: contractName, contract_b: contractBName, account_id: 'matt' }, GAS);

		expect(result).toEqual(true);
	});

	test('check balance is not enough', async () => {
		const contract = await getContract(alice);

		const result = await contract.check_balance_contract_b({ contract_a: contractName, contract_b: contractBName, account_id: 'not_matt' }, GAS);

		expect(result).toEqual(false);
	});

});