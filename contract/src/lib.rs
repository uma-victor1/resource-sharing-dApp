/*
 * This is an example of a Rust smart contract with two simple, symmetric functions:
 *
 * 1. set_greeting: accepts a greeting, such as "howdy", and records it for the user (account_id)
 *    who sent the request
 * 2. get_greeting: accepts an account_id and returns the greeting saved for it, defaulting to
 *    "Hello"
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://github.com/near/near-sdk-rs
 *
 */

mod models;
mod utils;

use crate::{
    utils::{
        AccountId,
    },
    models::{
        Resource,
        Donation
    }
};

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::{borsh::{self, BorshDeserialize, BorshSerialize}, Promise};
#[allow(unused_imports)]
use near_sdk::{env, PromiseIndex, near_bindgen};
near_sdk::setup_alloc!();


#[near_bindgen]
#[derive(Clone, Default, BorshDeserialize, BorshSerialize)]

pub struct Contract {
    owner: AccountId,
    resources: Vec<Resource>,
    donations: Vec<Donation>,
}

#[near_bindgen]
impl Contract{
    #[init]
    pub fn init(
        owner: AccountId,
    ) -> Self{
        let resources: Vec<Resource> = Vec::new();
        let donations: Vec<Donation> = Vec::new();


        Contract{
            owner,
            resources,
            donations
        }
    }

    pub fn add_resources(&mut self, title: String, url:String, description: String) {
        
        let id = self.resources.len() as i32;
        
        self.resources.push(Resource::new(
            id,
            title,
            url,
            description
        ));

        env::log("Added a new resource".as_bytes());
    }

    pub fn list_resources(&self) -> Vec<Resource> {
        let resources = &self.resources;

       return resources.to_vec();
    }

    pub fn resource_count(&mut self) -> usize {
        return self.resources.len();
    }

    pub fn add_vote(&mut self, id:usize){
        let resource: &mut Resource = self.resources.get_mut(id).unwrap();
        let voter = env::predecessor_account_id();

        resource.total_votes = resource.total_votes + 1;
        env::log("vote submitted succesfully".as_bytes());
        resource.votes.push(voter);
        
    }

    #[payable]
    pub fn add_donation(&mut self, id:usize, amount:u128) {
        let transfer_amount: u128 = 1_000_000_000_000_000_000_000_000 * amount;

        let resource: &mut Resource = self.resources.get_mut(id).unwrap();

        resource.total_donations = resource.total_donations + transfer_amount;
        self.donations.push(Donation::new());
       
       Promise::new(env::predecessor_account_id()).transfer(transfer_amount);

      env::log("You have donated succesfully".as_bytes());

    }

    pub fn get_donation_count(&mut self, id:usize) -> u128 {
        let resource: &mut Resource = self.resources.get_mut(id).unwrap();
        return resource.total_donations;

    }
}
