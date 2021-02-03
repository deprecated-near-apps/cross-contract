use borsh::{ BorshDeserialize, BorshSerialize };
use near_sdk::{
    near_bindgen, AccountId, Promise, Balance, Gas,
    serde_json::{json}
};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const NO_DEPOSIT: Balance = 0;
const GAS: Gas = 20_000_000_000_000;

#[near_bindgen]

#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct ContractA {}

#[near_bindgen]
impl ContractA {
    pub fn check_balance_contract_b(&mut self, contract_a: AccountId, contract_b: AccountId, account_id: AccountId) -> Promise {
        Promise::new(contract_b).function_call(
            b"check_balance".to_vec(),
            json!({ "contract_a": contract_a, "account_id": account_id }).to_string().as_bytes().to_vec(),
            NO_DEPOSIT,
            GAS,
        )
    }

    pub fn check_balance_callback(&mut self, amount: u128) -> bool {
        if amount > 500 {
            return true;
        }
        return false;
    }
}
