use borsh::{ BorshDeserialize, BorshSerialize };
use near_sdk::{
    near_bindgen, AccountId, Promise, Balance, Gas,
    serde_json::{json}
};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const NO_DEPOSIT: Balance = 0;
const GAS: Gas = 10_000_000_000_000;

#[near_bindgen]

#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct ContractB {}

#[near_bindgen]
impl ContractB {
    pub fn check_balance(&mut self, contract_a: AccountId, method_name: String, account_id: AccountId) -> Promise {
        let mut amount = 0;
        if account_id == "matt" {
            amount = 1000;
        }
        Promise::new(contract_a).function_call(
            method_name.into_bytes(),
            json!({ "amount": amount }).to_string().as_bytes().to_vec(),
            NO_DEPOSIT,
            GAS,
        )
    }
}
