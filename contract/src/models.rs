  
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
#[allow(unused_imports)]
use near_sdk::{env, near_bindgen};
use near_sdk::serde::{Deserialize, Serialize};


use crate::utils::{
    AccountId,
    Money,
    Timestamp
};

#[derive(Clone, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Resource{
    id: i32,
  pub creator: AccountId,
    created_at: Timestamp,
    title: String,
  pub url: String,
    pub total_donations: u128,
   pub total_votes: i64,
    description: String,
   pub votes: Vec<String>
}


impl Resource{
    pub fn new(id:i32, title: String, url:String, description: String) -> Self {
        
        Resource{
            id,
            creator: env::signer_account_id(),
            created_at: env::block_timestamp(),
            title,
            url,
            total_donations: 0,
            total_votes : 0,
            description,
            votes: vec![],
        }
    }
}

#[derive(Clone, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Donation {
    amount: Money,
    donor: AccountId,
}

impl Donation {
    pub fn new() -> Self {        
      Donation{
        amount: env::attached_deposit(),
        donor: env::predecessor_account_id(),
        }
    }  
}