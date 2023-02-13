from pyteal import *
from beaker import *
from typing import Final


class Voting(Application):

  token_id: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))

  # constants
  MIN_BAL = Int(100000)
  FEE = Int(1000)
  reg_begin: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  reg_end: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  vote_begin: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  vote_end: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  vote_count: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  num_of_voters: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))

  can_vote: Final[AccountStateValue] = AccountStateValue(stack_type=TealType.uint64, default=Int(0))
  vote_choice: Final[AccountStateValue] = AccountStateValue(stack_type=TealType.bytes, default=Bytes("abstain"))
  vote_amount: Final[AccountStateValue] = AccountStateValue(stack_type=TealType.uint64, default=Int(0))

  @create
  def create(self):
    return Seq(
      self.initialize_application_state()
    )

  @opt_in
  def optin(self):
    return Seq(
      self.initialize_account_state()
    )

  @external(authorize=Authorize.only(Global.creator_address()))
  def create_asset(self, asset_name: abi.String, unit_name: abi.String, total_supply: abi.Uint64, decimals: abi.Uint64):
    return Seq(
      Assert(self.token_id == Int(0)),
      InnerTxnBuilder.Execute({
        TxnField.type_enum: TxnType.AssetConfig,
        TxnField.config_asset_name: asset_name.get(),
        TxnField.config_asset_unit_name: unit_name.get(),
        TxnField.config_asset_total: total_supply.get(),
        TxnField.config_asset_decimals: decimals.get(),
        TxnField.config_asset_manager: self.address,
        TxnField.fee: self.FEE
      }),
      self.token_id.set(InnerTxn.created_asset_id())
    )

  @external(read_only=True)
  def get_token_id(self, *, output: ab
