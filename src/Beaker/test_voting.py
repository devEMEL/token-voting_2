import time
import pytest
from voting import Voting
from beaker import sandbox

from beaker.client import ApplicationClient
from beaker.client.api_providers import AlgoNode, Network
from algosdk.v2client.algod import AlgodClient
from algosdk.atomic_transaction_composer import AccountTransactionSigner, TransactionWithSigner
from algosdk.transaction import AssetTransferTxn

algod_client = AlgoNode(Network.TestNet).algod()
# client = AlgodClient("", "https://testnet-api.algonode.cloud")


@pytest.fixture(scope="module")
def create_app():
  global app_client
  global creator_acct
  global accounts
  global app

  accounts = sandbox.get_accounts()
  creator_acct = accounts[0]
  app = Voting()

  app_client = ApplicationClient(client=sandbox.get_algod_client(), app=app, signer=creator_acct.signer)
  app_id, app_addr, txid= app_client.create()
  
  app_client.fund(amt=1_000_000, addr=app_addr)

@pytest.fixture(scope="module")
def optin_app():
  
  global acct1
  global acct1_client

  acct1 = accounts[1]
  acct1_client = app_client.prepare(acct1.signer)
  acct1_client.opt_in()

@pytest.fixture(scope="module")
def create_asset():
  global token_id
  app_client.call(app.create_asset, asset_name="Energy Now on Sale", unit_name="ENS", total_supply=1000, decimals=0)
  token_id = app_client.get_application_state()["token_id"]

@pytest.fixture(scope="module")
def optin_asset():
  sp = app_client.get_suggested_params()
  txn = TransactionWithSigner(
    txn=AssetTransferTxn(sender=acct1.address, sp=sp, receiver=acct1.address, amt=0, index=token_id), signer=acct1.signer)
  acct1_client.call(app.optin_asset, opt_txn=txn)
  AssetTransferTxn()

@pytest.fixture(scope="module")
def check_asset_bal():

  acct1_client.call(app.get_asset_bal, account=acct1.address)


@pytest.fixture(scope="module")
def transfer_asset():
  acct1_client.call(app.transfer_asset, receiver=acct1.address, amount=1_000)




@pytest.mark.create
def test_create_app(create_app):
  assert app_client.get_application_state()["token_id"] == 0
  assert app_client.get_application_state()["reg_begin"] == 0
  assert app_client.get_application_state()["reg_end"] == 0
  assert app_client.get_application_state()["vote_begin"] == 0
  assert app_client.get_application_state()["vote_end"] == 0

@pytest.mark.create
def test_optin_app(create_app, optin_app):
  assert app_client.get_account_state(account=acct1.address)["can_vote"] == 0
  assert app_client.get_account_state(account=acct1.address)["vote_choice"] == "abstain"
  assert app_client.get_account_state(account=acct1.address)["vote_amount"] == 0


@pytest.mark.create
def test_asset_created(create_app, create_asset):
  assert app_client.get_application_state()["token_id"] > 0

# @pytest.mark.create
# def test_is_not_opted_into_asset(create_app, optin_app, create_asset, check_asset_bal):
#   assert acct1_client.call(app.get_asset_bal, account=acct1.address).return_value != 0

@pytest.mark.create
def test_is_opted_into_asset(create_app, optin_app, create_asset, optin_asset, check_asset_bal):
  assert acct1_client.call(app.get_asset_bal, account=acct1.address).return_value == 0

@pytest.mark.create
def test_transfer_asset(create_app, optin_app, create_asset, optin_asset, check_asset_bal, transfer_asset):
  assert acct1_client.call(app.get_asset_bal, account=acct1.address).return_value == 1000
