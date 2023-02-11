import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Voting extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { token_id: { type: bkr.AVMType.uint64, key: "token_id", desc: "", static: false }, reg_begin: { type: bkr.AVMType.uint64, key: "reg_begin", desc: "", static: false }, reg_end: { type: bkr.AVMType.uint64, key: "reg_end", desc: "", static: false }, vote_begin: { type: bkr.AVMType.uint64, key: "vote_begin", desc: "", static: false }, vote_end: { type: bkr.AVMType.uint64, key: "vote_end", desc: "", static: false }, vote_count: { type: bkr.AVMType.uint64, key: "vote_count", desc: "", static: false }, num_of_voters: { type: bkr.AVMType.uint64, key: "num_of_voters", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: { can_vote: { type: bkr.AVMType.uint64, key: "can_vote", desc: "", static: false }, has_voted: { type: bkr.AVMType.uint64, key: "has_voted", desc: "", static: false }, vote_choice: { type: bkr.AVMType.bytes, key: "vote_choice", desc: "", static: false }, vote_amount: { type: bkr.AVMType.uint64, key: "vote_amount", desc: "", static: false } }, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSAxMDAwIDQKYnl0ZWNibG9jayAweDc0NmY2YjY1NmU1ZjY5NjQgMHg3NjZmNzQ2NTVmNjM2Zjc1NmU3NCAweDZlNzU2ZDVmNmY2NjVmNzY2Zjc0NjU3MjczIDB4NjM2MTZlNWY3NjZmNzQ2NSAweDc2NmY3NDY1NWY2MTZkNmY3NTZlNzQgMHg3NjZmNzQ2NTVmNjI2NTY3Njk2ZSAweDc2NmY3NDY1NWY2NTZlNjQgMHg2ODYxNzM1Zjc2NmY3NDY1NjQgMHg3NjZmNzQ2NTVmNjM2ODZmNjk2MzY1IDB4NzI2NTY3NWY2MjY1Njc2OTZlIDB4NzI2NTY3NWY2NTZlNjQgMHg3OTY1NzMgMHgxNTFmN2M3NSAweDYxNjI3Mzc0NjE2OTZlCnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2wyMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDViNGZiOTkzIC8vICJjcmVhdGVfYXNzZXQoc3RyaW5nLHN0cmluZyx1aW50NjQsdWludDY0KXZvaWQiCj09CmJueiBtYWluX2wxOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDJiMzQxMzlhIC8vICJnZXRfdG9rZW5faWQoKXVpbnQ2NCIKPT0KYm56IG1haW5fbDE4CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YWJhMGYxMTIgLy8gIm9wdGluX2Fzc2V0KGF4ZmVyKXZvaWQiCj09CmJueiBtYWluX2wxNwp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDJmZDY2NDUyIC8vICJ0cmFuc2Zlcl9hc3NldChhZGRyZXNzLHVpbnQ2NCxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sMTYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhmZDJkOTRiNyAvLyAiZ2V0X2Fzc2V0X2JhbChhY2NvdW50LGFzc2V0KXVpbnQ2NCIKPT0KYm56IG1haW5fbDE1CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZWY5ZGMyZWEgLy8gImNyZWF0ZV9yZWdpc3RyYXRpb25fYW5kX3ZvdGluZyh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpdm9pZCIKPT0KYm56IG1haW5fbDE0CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NTk3ZmM3YzAgLy8gInJlZ2lzdGVyKCl2b2lkIgo9PQpibnogbWFpbl9sMTMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg4ZTBkNTJiYSAvLyAiaW5jcmVtZW50X3ZvdGUoKXZvaWQiCj09CmJueiBtYWluX2wxMgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGEwYTlkOGRiIC8vICJjYXN0X3ZvdGUoc3RyaW5nLGFzc2V0KXZvaWQiCj09CmJueiBtYWluX2wxMQplcnIKbWFpbl9sMTE6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKc3RvcmUgMTgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDE5CmxvYWQgMTgKbG9hZCAxOQpjYWxsc3ViIGNhc3R2b3RlXzEyCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBpbmNyZW1lbnR2b3RlXzExCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiByZWdpc3Rlcl8xMAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTQ6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpzdG9yZSAxNAp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgMTUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwpidG9pCnN0b3JlIDE2CnR4bmEgQXBwbGljYXRpb25BcmdzIDQKYnRvaQpzdG9yZSAxNwpsb2FkIDE0CmxvYWQgMTUKbG9hZCAxNgpsb2FkIDE3CmNhbGxzdWIgY3JlYXRlcmVnaXN0cmF0aW9uYW5kdm90aW5nXzkKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE1Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMTAKbG9hZCA5CmxvYWQgMTAKY2FsbHN1YiBnZXRhc3NldGJhbF84CnN0b3JlIDExCmJ5dGVjIDEyIC8vIDB4MTUxZjdjNzUKbG9hZCAxMQppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE2Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCnN0b3JlIDYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgpidG9pCnN0b3JlIDcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDgKbG9hZCA2CmxvYWQgNwpsb2FkIDgKY2FsbHN1YiB0cmFuc2ZlcmFzc2V0XzcKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE3Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDUKbG9hZCA1Cmd0eG5zIFR5cGVFbnVtCmludGNfMyAvLyBheGZlcgo9PQphc3NlcnQKbG9hZCA1CmNhbGxzdWIgb3B0aW5hc3NldF82CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXR0b2tlbmlkXzUKc3RvcmUgNApieXRlYyAxMiAvLyAweDE1MWY3Yzc1CmxvYWQgNAppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE5Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCnN0b3JlIDAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgpzdG9yZSAxCnR4bmEgQXBwbGljYXRpb25BcmdzIDMKYnRvaQpzdG9yZSAyCnR4bmEgQXBwbGljYXRpb25BcmdzIDQKYnRvaQpzdG9yZSAzCmxvYWQgMApsb2FkIDEKbG9hZCAyCmxvYWQgMwpjYWxsc3ViIGNyZWF0ZWFzc2V0XzQKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDIwOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wyNgp0eG4gT25Db21wbGV0aW9uCmludGNfMSAvLyBPcHRJbgo9PQpibnogbWFpbl9sMjUKdHhuIE9uQ29tcGxldGlvbgpwdXNoaW50IDIgLy8gQ2xvc2VPdXQKPT0KYm56IG1haW5fbDI0CmVycgptYWluX2wyNDoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KYXNzZXJ0CmNhbGxzdWIgY2xlYXJ2b3RlXzMKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDI1Ogp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQphc3NlcnQKY2FsbHN1YiBvcHRpbl8xCmludGNfMSAvLyAxCnJldHVybgptYWluX2wyNjoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBjcmVhdGUKY3JlYXRlXzA6CmJ5dGVjXzAgLy8gInRva2VuX2lkIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlYyA5IC8vICJyZWdfYmVnaW4iCmludGNfMCAvLyAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDEwIC8vICJyZWdfZW5kIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlYyA1IC8vICJ2b3RlX2JlZ2luIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlYyA2IC8vICJ2b3RlX2VuZCIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMSAvLyAidm90ZV9jb3VudCIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMiAvLyAibnVtX29mX3ZvdGVycyIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBvcHRpbgpvcHRpbl8xOgp0eG4gU2VuZGVyCmJ5dGVjXzMgLy8gImNhbl92b3RlIgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWMgNyAvLyAiaGFzX3ZvdGVkIgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWMgOCAvLyAidm90ZV9jaG9pY2UiCmJ5dGVjIDEzIC8vICJhYnN0YWluIgphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWMgNCAvLyAidm90ZV9hbW91bnQiCmludGNfMCAvLyAwCmFwcF9sb2NhbF9wdXQKcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMjoKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09CnJldHN1YgoKLy8gY2xlYXJfdm90ZQpjbGVhcnZvdGVfMzoKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApieXRlYyA1IC8vICJ2b3RlX2JlZ2luIgphcHBfZ2xvYmFsX2dldAo+PQphc3NlcnQKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApieXRlYyA2IC8vICJ2b3RlX2VuZCIKYXBwX2dsb2JhbF9nZXQKPD0KYXNzZXJ0CnR4biBTZW5kZXIKYnl0ZWMgOCAvLyAidm90ZV9jaG9pY2UiCmFwcF9sb2NhbF9nZXQKYnl0ZWMgMTEgLy8gInllcyIKPT0KYnogY2xlYXJ2b3RlXzNfbDIKYnl0ZWNfMiAvLyAibnVtX29mX3ZvdGVycyIKYnl0ZWNfMiAvLyAibnVtX29mX3ZvdGVycyIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKLQphcHBfZ2xvYmFsX3B1dApieXRlY18xIC8vICJ2b3RlX2NvdW50IgpieXRlY18xIC8vICJ2b3RlX2NvdW50IgphcHBfZ2xvYmFsX2dldAp0eG4gU2VuZGVyCmJ5dGVjIDQgLy8gInZvdGVfYW1vdW50IgphcHBfbG9jYWxfZ2V0Ci0KYXBwX2dsb2JhbF9wdXQKdHhuIFNlbmRlcgpieXRlYyA0IC8vICJ2b3RlX2Ftb3VudCIKaW50Y18wIC8vIDAKYXBwX2xvY2FsX3B1dApjbGVhcnZvdGVfM19sMjoKdHhuIFNlbmRlcgpieXRlYyA4IC8vICJ2b3RlX2Nob2ljZSIKcHVzaGJ5dGVzIDB4IC8vICIiCmFwcF9sb2NhbF9wdXQKcmV0c3ViCgovLyBjcmVhdGVfYXNzZXQKY3JlYXRlYXNzZXRfNDoKc3RvcmUgMjMKc3RvcmUgMjIKc3RvcmUgMjEKc3RvcmUgMjAKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzIKLy8gdW5hdXRob3JpemVkCmFzc2VydApieXRlY18wIC8vICJ0b2tlbl9pZCIKYXBwX2dsb2JhbF9nZXQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0Cml0eG5fYmVnaW4KcHVzaGludCAzIC8vIGFjZmcKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDIwCmV4dHJhY3QgMiAwCml0eG5fZmllbGQgQ29uZmlnQXNzZXROYW1lCmxvYWQgMjEKZXh0cmFjdCAyIDAKaXR4bl9maWVsZCBDb25maWdBc3NldFVuaXROYW1lCmxvYWQgMjIKaXR4bl9maWVsZCBDb25maWdBc3NldFRvdGFsCmxvYWQgMjMKaXR4bl9maWVsZCBDb25maWdBc3NldERlY2ltYWxzCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCml0eG5fZmllbGQgQ29uZmlnQXNzZXRNYW5hZ2VyCmludGNfMiAvLyAxMDAwCml0eG5fZmllbGQgRmVlCml0eG5fc3VibWl0CmJ5dGVjXzAgLy8gInRva2VuX2lkIgppdHhuIENyZWF0ZWRBc3NldElECmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gZ2V0X3Rva2VuX2lkCmdldHRva2VuaWRfNToKYnl0ZWNfMCAvLyAidG9rZW5faWQiCmFwcF9nbG9iYWxfZ2V0CnJldHN1YgoKLy8gb3B0aW5fYXNzZXQKb3B0aW5hc3NldF82OgpzdG9yZSAyNApnbG9iYWwgR3JvdXBTaXplCnB1c2hpbnQgMiAvLyAyCj09CmFzc2VydApsb2FkIDI0Cmd0eG5zIFR5cGVFbnVtCmludGNfMyAvLyBheGZlcgo9PQphc3NlcnQKbG9hZCAyNApndHhucyBBc3NldEFtb3VudAppbnRjXzAgLy8gMAo9PQphc3NlcnQKcmV0c3ViCgovLyB0cmFuc2Zlcl9hc3NldAp0cmFuc2ZlcmFzc2V0Xzc6CnN0b3JlIDI3CnN0b3JlIDI2CnN0b3JlIDI1CmxvYWQgMjUKYnl0ZWNfMCAvLyAidG9rZW5faWQiCmFwcF9nbG9iYWxfZ2V0CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSAyOAppbnRjXzAgLy8gMAo+PQphc3NlcnQKaXR4bl9iZWdpbgppbnRjXzMgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDI1Cml0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgpieXRlY18wIC8vICJ0b2tlbl9pZCIKYXBwX2dsb2JhbF9nZXQKaXR4bl9maWVsZCBYZmVyQXNzZXQKbG9hZCAyNgppdHhuX2ZpZWxkIEFzc2V0QW1vdW50CmludGNfMiAvLyAxMDAwCml0eG5fZmllbGQgRmVlCml0eG5fc3VibWl0CnJldHN1YgoKLy8gZ2V0X2Fzc2V0X2JhbApnZXRhc3NldGJhbF84OgpzdG9yZSAxMgp0eG5hcyBBY2NvdW50cwpieXRlY18wIC8vICJ0b2tlbl9pZCIKYXBwX2dsb2JhbF9nZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDEzCnJldHN1YgoKLy8gY3JlYXRlX3JlZ2lzdHJhdGlvbl9hbmRfdm90aW5nCmNyZWF0ZXJlZ2lzdHJhdGlvbmFuZHZvdGluZ185OgpzdG9yZSAzMgpzdG9yZSAzMQpzdG9yZSAzMApzdG9yZSAyOQpieXRlYyA5IC8vICJyZWdfYmVnaW4iCmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKbG9hZCAyOQorCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDEwIC8vICJyZWdfZW5kIgpnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmxvYWQgMzAKKwphcHBfZ2xvYmFsX3B1dApieXRlYyA1IC8vICJ2b3RlX2JlZ2luIgpnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmxvYWQgMzEKKwphcHBfZ2xvYmFsX3B1dApieXRlYyA2IC8vICJ2b3RlX2VuZCIKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApsb2FkIDMyCisKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyByZWdpc3RlcgpyZWdpc3Rlcl8xMDoKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApieXRlYyA5IC8vICJyZWdfYmVnaW4iCmFwcF9nbG9iYWxfZ2V0Cj49CmFzc2VydApnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmJ5dGVjIDEwIC8vICJyZWdfZW5kIgphcHBfZ2xvYmFsX2dldAo8PQphc3NlcnQKdHhuIFNlbmRlcgpieXRlY18zIC8vICJjYW5fdm90ZSIKYXBwX2xvY2FsX2dldAppbnRjXzAgLy8gMAo9PQphc3NlcnQKdHhuIFNlbmRlcgpieXRlYyA3IC8vICJoYXNfdm90ZWQiCmFwcF9sb2NhbF9nZXQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAiY2FuX3ZvdGUiCmludGNfMSAvLyAxCmFwcF9sb2NhbF9wdXQKcmV0c3ViCgovLyBpbmNyZW1lbnRfdm90ZQppbmNyZW1lbnR2b3RlXzExOgp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gInRva2VuX2lkIgphcHBfZ2xvYmFsX2dldAphc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKc3RvcmUgMzQKc3RvcmUgMzMKbG9hZCAzNAphc3NlcnQKbG9hZCAzMwppbnRjXzIgLy8gMTAwMAo+PQphc3NlcnQKYnl0ZWNfMiAvLyAibnVtX29mX3ZvdGVycyIKYnl0ZWNfMiAvLyAibnVtX29mX3ZvdGVycyIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKKwphcHBfZ2xvYmFsX3B1dApieXRlY18xIC8vICJ2b3RlX2NvdW50IgpieXRlY18xIC8vICJ2b3RlX2NvdW50IgphcHBfZ2xvYmFsX2dldApsb2FkIDMzCisKYXBwX2dsb2JhbF9wdXQKdHhuIFNlbmRlcgpieXRlYyA0IC8vICJ2b3RlX2Ftb3VudCIKbG9hZCAzMwphcHBfbG9jYWxfcHV0CnJldHN1YgoKLy8gY2FzdF92b3RlCmNhc3R2b3RlXzEyOgpzdG9yZSAzNgpzdG9yZSAzNQpnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmJ5dGVjIDUgLy8gInZvdGVfYmVnaW4iCmFwcF9nbG9iYWxfZ2V0Cj49CmFzc2VydApnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmJ5dGVjIDYgLy8gInZvdGVfZW5kIgphcHBfZ2xvYmFsX2dldAo8PQphc3NlcnQKdHhuIFNlbmRlcgpieXRlY18zIC8vICJjYW5fdm90ZSIKYXBwX2xvY2FsX2dldAppbnRjXzEgLy8gMQo9PQphc3NlcnQKdHhuIFNlbmRlcgpieXRlYyA3IC8vICJoYXNfdm90ZWQiCmFwcF9sb2NhbF9nZXQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmxvYWQgMzUKZXh0cmFjdCAyIDAKYnl0ZWMgMTEgLy8gInllcyIKPT0KbG9hZCAzNQpleHRyYWN0IDIgMApwdXNoYnl0ZXMgMHg2ZTZmIC8vICJubyIKPT0KfHwKbG9hZCAzNQpleHRyYWN0IDIgMApieXRlYyAxMyAvLyAiYWJzdGFpbiIKPT0KfHwKYXNzZXJ0CmxvYWQgMzUKZXh0cmFjdCAyIDAKYnl0ZWMgMTEgLy8gInllcyIKPT0KYnogY2FzdHZvdGVfMTJfbDIKdHhuIFNlbmRlcgpieXRlY18wIC8vICJ0b2tlbl9pZCIKYXBwX2dsb2JhbF9nZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDM4CnN0b3JlIDM3CmxvYWQgMzgKYXNzZXJ0CmxvYWQgMzcKaW50Y18yIC8vIDEwMDAKPj0KYXNzZXJ0CmJ5dGVjXzIgLy8gIm51bV9vZl92b3RlcnMiCmJ5dGVjXzIgLy8gIm51bV9vZl92b3RlcnMiCmFwcF9nbG9iYWxfZ2V0CmludGNfMSAvLyAxCisKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMSAvLyAidm90ZV9jb3VudCIKYnl0ZWNfMSAvLyAidm90ZV9jb3VudCIKYXBwX2dsb2JhbF9nZXQKbG9hZCAzNworCmFwcF9nbG9iYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWMgNCAvLyAidm90ZV9hbW91bnQiCmxvYWQgMzcKYXBwX2xvY2FsX3B1dApjYXN0dm90ZV8xMl9sMjoKdHhuIFNlbmRlcgpieXRlYyA4IC8vICJ2b3RlX2Nob2ljZSIKbG9hZCAzNQpleHRyYWN0IDIgMAphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAiY2FuX3ZvdGUiCmludGNfMCAvLyAwCmFwcF9sb2NhbF9wdXQKdHhuIFNlbmRlcgpieXRlYyA3IC8vICJoYXNfdm90ZWQiCmludGNfMSAvLyAxCmFwcF9sb2NhbF9wdXQKcmV0c3Vi";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4NzY2Zjc0NjU1ZjYzNjg2ZjY5NjM2NSAweDZlNzU2ZDVmNmY2NjVmNzY2Zjc0NjU3MjczIDB4NzY2Zjc0NjU1ZjYzNmY3NTZlNzQgMHg3NjZmNzQ2NTVmNjE2ZDZmNzU2ZTc0CnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2wyCmVycgptYWluX2wyOgpjYWxsc3ViIGNsZWFydm90ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY2xlYXJfdm90ZQpjbGVhcnZvdGVfMDoKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApwdXNoYnl0ZXMgMHg3NjZmNzQ2NTVmNjI2NTY3Njk2ZSAvLyAidm90ZV9iZWdpbiIKYXBwX2dsb2JhbF9nZXQKPj0KYXNzZXJ0Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKcHVzaGJ5dGVzIDB4NzY2Zjc0NjU1ZjY1NmU2NCAvLyAidm90ZV9lbmQiCmFwcF9nbG9iYWxfZ2V0Cjw9CmFzc2VydAp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gInZvdGVfY2hvaWNlIgphcHBfbG9jYWxfZ2V0CnB1c2hieXRlcyAweDc5NjU3MyAvLyAieWVzIgo9PQpieiBjbGVhcnZvdGVfMF9sMgpieXRlY18xIC8vICJudW1fb2Zfdm90ZXJzIgpieXRlY18xIC8vICJudW1fb2Zfdm90ZXJzIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQotCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzIgLy8gInZvdGVfY291bnQiCmJ5dGVjXzIgLy8gInZvdGVfY291bnQiCmFwcF9nbG9iYWxfZ2V0CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAidm90ZV9hbW91bnQiCmFwcF9sb2NhbF9nZXQKLQphcHBfZ2xvYmFsX3B1dAp0eG4gU2VuZGVyCmJ5dGVjXzMgLy8gInZvdGVfYW1vdW50IgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CmNsZWFydm90ZV8wX2wyOgp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gInZvdGVfY2hvaWNlIgpwdXNoYnl0ZXMgMHggLy8gIiIKYXBwX2xvY2FsX3B1dApyZXRzdWI=";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "create_asset", desc: "", args: [{ type: "string", name: "asset_name", desc: "" }, { type: "string", name: "unit_name", desc: "" }, { type: "uint64", name: "total_supply", desc: "" }, { type: "uint64", name: "decimals", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_token_id", desc: "", args: [], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "optin_asset", desc: "", args: [{ type: "axfer", name: "opt_txn", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "transfer_asset", desc: "", args: [{ type: "address", name: "receiver", desc: "" }, { type: "uint64", name: "amount", desc: "" }, { type: "asset", name: "a_id", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_asset_bal", desc: "", args: [{ type: "account", name: "account", desc: "" }, { type: "asset", name: "asset_id", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "create_registration_and_voting", desc: "", args: [{ type: "uint64", name: "reg_begin", desc: "" }, { type: "uint64", name: "reg_end", desc: "" }, { type: "uint64", name: "vote_begin", desc: "" }, { type: "uint64", name: "vote_end", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "register", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "increment_vote", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "cast_vote", desc: "", args: [{ type: "string", name: "vote_choice", desc: "" }, { type: "asset", name: "a_id", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async create_asset(args: {
        asset_name: string;
        unit_name: string;
        total_supply: bigint;
        decimals: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.create_asset({ asset_name: args.asset_name, unit_name: args.unit_name, total_supply: args.total_supply, decimals: args.decimals }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_token_id(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.get_token_id(txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async optin_asset(args: {
        opt_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.optin_asset({ opt_txn: args.opt_txn }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async transfer_asset(args: {
        receiver: string;
        amount: bigint;
        a_id?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.transfer_asset({ receiver: args.receiver, amount: args.amount, a_id: args.a_id === undefined ? await this._resolve("global-state", "token_id") as bigint : args.a_id }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_asset_bal(args: {
        account: string;
        asset_id?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.get_asset_bal({ account: args.account, asset_id: args.asset_id === undefined ? await this._resolve("global-state", "token_id") as bigint : args.asset_id }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async create_registration_and_voting(args: {
        reg_begin: bigint;
        reg_end: bigint;
        vote_begin: bigint;
        vote_end: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.create_registration_and_voting({ reg_begin: args.reg_begin, reg_end: args.reg_end, vote_begin: args.vote_begin, vote_end: args.vote_end }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async register(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.register(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async increment_vote(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.increment_vote(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async cast_vote(args: {
        vote_choice: string;
        a_id?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.cast_vote({ vote_choice: args.vote_choice, a_id: args.a_id === undefined ? await this._resolve("global-state", "token_id") as bigint : args.a_id }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        create_asset: async (args: {
            asset_name: string;
            unit_name: string;
            total_supply: bigint;
            decimals: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "create_asset"), { asset_name: args.asset_name, unit_name: args.unit_name, total_supply: args.total_supply, decimals: args.decimals }, txnParams, atc);
        },
        get_token_id: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_token_id"), {}, txnParams, atc);
        },
        optin_asset: async (args: {
            opt_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "optin_asset"), { opt_txn: args.opt_txn }, txnParams, atc);
        },
        transfer_asset: async (args: {
            receiver: string;
            amount: bigint;
            a_id?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "transfer_asset"), { receiver: args.receiver, amount: args.amount, a_id: args.a_id === undefined ? await this._resolve("global-state", "token_id") : args.a_id }, txnParams, atc);
        },
        get_asset_bal: async (args: {
            account: string;
            asset_id?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_asset_bal"), { account: args.account, asset_id: args.asset_id === undefined ? await this._resolve("global-state", "token_id") : args.asset_id }, txnParams, atc);
        },
        create_registration_and_voting: async (args: {
            reg_begin: bigint;
            reg_end: bigint;
            vote_begin: bigint;
            vote_end: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "create_registration_and_voting"), { reg_begin: args.reg_begin, reg_end: args.reg_end, vote_begin: args.vote_begin, vote_end: args.vote_end }, txnParams, atc);
        },
        register: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "register"), {}, txnParams, atc);
        },
        increment_vote: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "increment_vote"), {}, txnParams, atc);
        },
        cast_vote: async (args: {
            vote_choice: string;
            a_id?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "cast_vote"), { vote_choice: args.vote_choice, a_id: args.a_id === undefined ? await this._resolve("global-state", "token_id") : args.a_id }, txnParams, atc);
        }
    };
}
