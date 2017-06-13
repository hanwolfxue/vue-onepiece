import 'theme/containers/account/OrderList.less';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Moment from 'moment';
import TextBox from '../../components/TextBox';
import SearchBox from '../../components/SearchBox';
import ComboBox from '../../components/ComboBox';
import DatePicker from '../../components/DatePicker';
import Button from '../../components/Button';
import Form ,{ FormGroup } from '../../components/Form';
import Icon from '../../components/Icon';
import Pagenation from '../../components/Pagenation';
const PAGE_SIZE = 5,
  PAYMENT_DEADLINE = HmallConfig.payment_deadline * 3600 * 1000,
  ORDER_STATUS = {
    0: 'WAIT_BUYER_PAY',
    1: 'WAIT_SELLER_SEND_GOODS',
    2: 'SELLER_CONSIGNED_PART',
    3: 'WAIT_BUYER_CONFIRM_GOODS',
    4: 'WAIT_BUYER_TAKE_GOODS',
    5: 'TRADE_FINISHED',
    6: 'TRADE_CLOSED_BY_UNIQLO',
    7: 'TRADE_CLOSED'
  },
  ORDER_SIGN = {
    0: 'DEFAULT',
    1: 'REFUND',
    2: 'AFTERSALE',
    3: 'REFUNDAF'
  }
const distributionOptions = {
  'PICKUP': '门店自提',
  'EXPRESS': '快递配送'
}
const statusOptions = {
  'WAIT_BUYER_PAY': '待付款',
  'WAIT_SELLER_SEND_GOODS': '待发货/已付款',
  'SELLER_CONSIGNED_PART': '部分发货',
  'WAIT_BUYER_CONFIRM_GOODS': '已发货',
  'WAIT_BUYER_TAKE_GOODS': '待自提',
  'TRADE_FINISHED': '交易成功',
  'TRADE_CLOSED_BY_UNIQLO': '交易取消',
  'TRADE_CLOSED': '交易关闭'
}
export default class OrderList extends Component{
  constructor(props) {
    super(props);
    let { page, status, orderId, distribution, start, end } = props.location.query;
    this.orderInOperation = [];
    this.state = {
      cancelResp: [],
      fetch_status: 'uninit',
      total: 0,
      resp: [],
      query: {
        page,
        status,
        orderId,
        distribution,
        start,
        end
      }
    }
  }
  componentWillMount() {
    this.query();
  }
  componentWillUnmount() {
    this.isUnMounted = true;
  }
  componentWillReceiveProps(nextProps){
    let { page, status, orderId, distribution, start, end  } = nextProps.location.query,
      { query } = this.props.location;
    if(query.page != page || query.status != status || query.orderId != orderId || query.distribution != distribution || query.start != start || query.end != end){
      this.state.fetch_status = 'uninit';
      this.state.query = { page, status, orderId, start, end, distribution };
      this.query();
    }
  }
  query() {
    let { page = 1, status, orderId, distribution, start, end } = this.state.query;
    fetch(`${Hmall.service(odService)}/order/queryForUserOrders/${page}/${PAGE_SIZE}`,{
      method: 'post',
      headers: Hmall.getHeader({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        status,
        orderId,
        distribution,
        start: start ? Number(start) : undefined,
        end: end ? Number(end) : undefined
      })
    })
      .then(Hmall.convertResponse('json',this))
      .then(json => {
        this.setState({
          resp: json.resp || [],
          total: json.total,
          fetch_status: 'init'
        });
      })
      .catch(Hmall.catchHttpError(()=>{
        this.setState({
          fetch_status: 'error'
        });
      }))
  }
  paymentNow(orderId) {
    browserHistory.push(`/payment/order-payment.html?oid=${orderId}`);
  }
  buyAgain(orderId) {
    browserHistory.push('/cart.html?oid='+orderId);
  }
// 取消订单
  closeOrder(order,noconfirm) {
    let { orderInOperation, state } = this,
      { orderId } = order,
      { resp } = state;
    if(orderInOperation.indexOf(orderId) != -1){
      return;
    }
    let cancel = () => {
      order.status = ORDER_STATUS[6];
      this.forceUpdate();
    };
    noconfirm ? cancel() : (() =>{
      let index = orderInOperation.length,
        callback = () => orderInOperation.splice(index,1);
      orderInOperation.push(orderId);
      fetch(`${Hmall.service(odService)}/order/updateOrderCanceled/${orderId}`,{
        method: 'POST',
        headers: Hmall.getHeader()
      })
        .then(Hmall.convertResponse('json', this))
        .then(json => {
          cancel();
          callback();
        })
        .catch(Hmall.catchHttpError(callback))
    })();
  }
  orderRecycle(order) {
    if(confirm('确认删除？')){
      let _orderId = order.orderId,
        { total, query }= this.state,
        { page = 1, status, distribution, orderId, start, end } = query;
      if(page!=(Math.ceil((total)/PAGE_SIZE))){
        page = page;
      }else{
        page = Math.ceil((total-1)/PAGE_SIZE)
      }
      page==0 ? page=1:page;
      this.forceUpdate();
      fetch(`${Hmall.service(odService)}/order/updateOrderRecovered/${_orderId}`,{
        method: 'POST',
        headers: Hmall.getHeader({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          pageNum: page,
          pageSize: PAGE_SIZE,
          status,
          orderId,
          distribution,
          start,
          end
        })
      })
        .then(Hmall.convertResponse('json', this))
        .then(json => {
          let { success } = json;
          if(success) {
            let { resp ,total } = this.state;
            resp.splice(resp.indexOf(order),1);
            this.setState({ resp: json.resp, total: json.total, page: page });
            this.forceUpdate();
          }else{
            alert(json.msgCode);
          }
        })
        .catch(Hmall.catchHttpError())
    }
  }
  finishOrder(order) {
    if(confirm("确认收货？")){
      let { orderId } = order;
      fetch(`${Hmall.service(odService)}/order/updateOrderConfirmed/${orderId}`,{
        method: 'POST',
        headers: Hmall.getHeader({"Content-Type":"application/json",})
      })
        .then(Hmall.convertResponse('json', this))
        .then(json => {
          if(json.success) {
            order.status = ORDER_STATUS[5];
            this.forceUpdate();
          }else{
            alert(json.msgCode);
          }
        })
        .catch(Hmall.catchHttpError())
    }
  }
  //buyAgainOrder(order){
  //  return new Promise()
  //}
  /* 商品再次购买 */
  buyAgainOrder(order){
    let { details, distribution, address, orderId } = order,
      { city, district, state } = address,
      storeName = address.storeName||'',
      distributionId = address.code||'',
      orderBuyAgainCode = [],
      orderBuyFalseName = [],
      orderBuySuccess = [],
      newAddress = [city, district, state];
    details.map( (detail, index) => {
      let { productDetailInfo={}, summaryInfo={}, quantity, productCode, productId , approval} = detail,
        { name } = summaryInfo,
        temp = {
          quantity,
          productCode,
          productId,
          distribution,
          storeName,
          distributionId,
          address:newAddress
        };
      //if(approval=="list"){
      orderBuySuccess.push(temp);
      orderBuyAgainCode.push(productCode)
      //}else{
      //  alert(name+"商品已不能购买")
      //}
    });
    if(orderBuyAgainCode.length!=0){
      fetch(`${Hmall.service(pdService)}/product/validateProductByCodes`,{
        method: 'POST',
        headers: Hmall.getHeader({"Content-Type":"application/json",}),
        body: JSON.stringify(orderBuyAgainCode)
      })
        .then(Hmall.convertResponse('json', this))
        .then(json => {
          let { success, resp } = json;
          if(success) {
            fetch(`${Hmall.service(ctService)}/cart/insert`,{
              method: 'POST',
              headers: Hmall.getHeader({"Content-Type":"application/json",}),
              body: JSON.stringify(orderBuySuccess)
            })
              .then(Hmall.convertResponse('json',this))
              .then(json => {
                if(json.success) {
                  Hmall.Storage.get('miniCart').show(true);
                  this.buyAgain(orderId)
                }
              })
          }else{
            resp.map((code, index) => {
              details.map( (detail, index) => {
                let { productCode, summaryInfo={} } = detail,
                  { name } = summaryInfo;
                if(productCode==code){
                  orderBuyFalseName.push(name);
                }
              })
            })
            alert(orderBuyFalseName.join('、')+"商品已不能购买")
          }
        })
        .catch(Hmall.catchHttpError())
    }
  }
  // 取消订单上方标签改变
  handleP(orderId){
    let { cancelResp } = this.state;
    if(cancelResp.indexOf(orderId)!=-1){
      cancelResp.splice(cancelResp.indexOf(orderId),1);
    }else{
      cancelResp.push(orderId)
    }
    this.setState({cancelResp:cancelResp})
  }
  getOperation(order) {
    let { orderId, status, isCommented } = order,
      { cancelResp } = this.state,
      buy_again = <p key={5} ><Link className="buyAgain" onClick={() => this.buyAgainOrder(order) } >再次购买</Link></p>;
    switch(status){
      case ORDER_STATUS[0]:return [
          this.getDeadLine(order),
        <Button key={2} onClick={() => this.paymentNow(orderId)} className="red" text="立即支付" width={80} height={30}></Button>,
  <p key={3} className="hand-point"  onClick={()=> this.handleP(orderId)}>{cancelResp.indexOf(orderId)!=-1?'∧' : '∨'}</p>,
    cancelResp.indexOf(orderId)!=-1&&<Link key={4} onClick={()=> Hmall.dialog({
      title: '提示',
      text: '您是否确认取消，一旦取消不能恢复。',
      buttons: [{
        text: '我再看看',
        className: 'red'
      },{
        text: '确认取消',
        onClick: ()=>this.closeOrder(order)
      }]
    })}>取消订单</Link>];
  case ORDER_STATUS[3]: return [
      <Button key={2} className="red" text="确认收货" width={80} height={30} onClick={() => this.finishOrder(order)}></Button>,
      buy_again];
  case ORDER_STATUS[5]: return [
        isCommented?<p key={1} className="notice-word">已评价</p>:<p key={1} className="notice-word"><Link  to={`/account/order-center/order-list/evaluate.html?orderId=${orderId}`}>评价</Link></p>,
      buy_again]
  default: return buy_again;
  }
  }
  getAfterMarketDetails(e, detail, oid) {
    let { aftermarkets, init_aftermarkets, productDetailInfo} = detail,
      { currentTarget } = e,
      { classList } = currentTarget;
    if(!classList.contains('hover')){
      classList.add('hover');
      currentTarget.addEventListener('mouseleave',function(){
        currentTarget.timeout = setTimeout(() =>{
          classList.remove('hover');
        },1000,this);
      },false)
      if(!init_aftermarkets && !aftermarkets) {
        let callback = () => {
          detail.init_aftermarkets = true;
        }
        fetch(`${Hmall.service(odService)}/order/queryForReturnId/${oid}/${productDetailInfo.productId}`,{
          headers: Hmall.getHeader()
        })
          .then(Hmall.convertResponse('json',this))
          .then(json => {
            detail.aftermarkets = json.resp[0] || [];
            callback();
            this.forceUpdate();
          })
          .catch(Hmall.catchHttpError(callback));
      }
    }else if(currentTarget.timeout){
      clearTimeout(currentTarget.timeout);
    }
  }
  getProductOperationByStatus(detail) {
    let { status, detailId, sign, isClosedAfterSale } = detail;
    switch(status){
      case ORDER_STATUS[1]:
      case ORDER_STATUS[4]: return sign == ORDER_SIGN[0] && <p><Link to={`/account/order-center/order-list/apply-refund.html?uid=${detailId}`}>申请退款</Link></p>;
  case ORDER_STATUS[3]:
  case ORDER_STATUS[5]: return !isClosedAfterSale&&<p><Link to={`/account/order-center/order-list/apply-aftermarket.html?uid=${detailId}`}>申请售后</Link></p>;
  }
  }
  getProductOperationBySign(detail, oid) {
    let { aftermarkets, init_aftermarkets, sign, refundId } = detail,items=[];
    let index = 0;
    items.push(<p><Link to={`/account/order-center/order-list/view-refund.html?refundId=${refundId}`}>查看退款</Link></p>);
    items.push(<div className="aftermarket" onMouseEnter={(e) => this.getAfterMarketDetails(e, detail, oid)}>
  <p>查看售后</p>
    <div>
    {
      init_aftermarkets ?
    <ul>
    {
      aftermarkets.returns.map( item => {
      return <li key={index++}>
        <Link to={`/account/order-center/order-list/view-aftermarket-refund-return.html?refundId=${item.id}`}>退货：{item.id}</Link>
      {/*
       * item.status == 'CLOSED' ? <Link
       * to={`/account/order-center/order-list/view-aftermarket-refund-return.html?refundId=${item.id}`}>退货：{item.id}</Link> :
       * <span>退货：{item.id}</span>
       */}
      </li>;
    })
      .concat(aftermarkets.refunds.map( item => {
        return <li key={index++}>
          <Link to={`/account/order-center/order-list/view-aftermarket-only-refund.html?refundId=${item.id}`}>退款：{item.id}</Link>
        {/*
         * item.status == 'CLOSED' ? <Link
         * to={`/account/order-center/order-list/view-aftermarket-only-refund.html?refundId=${item.id}`}>退款：{item.id}</Link> :
         * <span>退款：{item.id}</span>
         */}
        </li>;
      }))
      .concat(aftermarkets.replaces.map( item => {
        return <li key={index++}>
          <Link to={`/account/order-center/order-list/view-aftermarket-replacement.html?replaceId=${item.id}`}>换货：{item.id}</Link>
        {/*
         * item.status == ORDER_STATUS[6] || item.status ==
         * ORDER_STATUS[7] ? <Link
         * to={`/account/order-center/order-list/view-aftermarket-replacement.html?replaceId=${item.id}`}>换货：{item.id}</Link> :
         * <span>换货：{item.id}</span>
         */}
        </li>;
      }))
  }
  </ul> : <div className="loading"></div>
  }
  </div>
    </div>)
    switch(sign){
      case ORDER_SIGN[1]: return items[0];
      case ORDER_SIGN[2]: return items[1];
      case ORDER_SIGN[3]: return items;
    }
  }
  getDistribution(distribution) {
    return distributionOptions[distribution]
  }
  getStatusDescription(code,distribution){
    switch(code){
      case ORDER_STATUS[0]: return <span className="notice-word">待付款</span>;
      case ORDER_STATUS[1]: return distribution=='EXPRESS'?'待发货':'已付款';
      case ORDER_STATUS[2]: return '部分发货';
      case ORDER_STATUS[3]: return '已发货';
      case ORDER_STATUS[4]: return '待自提';
      case ORDER_STATUS[5]: return '交易成功';
      case ORDER_STATUS[6]: return '交易取消';
      case ORDER_STATUS[7]: return '交易关闭';
    }
  }
  getDeadLine(order) {
    return <Timer key={1} order={order} onEnd={() => this.closeOrder(order,true)}></Timer>;
  }
  renderOrderDetails(order) {
    let { details, orderId, price, status, distribution } = order,
      account=Number(price.account||0),
      freight=Number(price.freight||0),
      row = details.length;
    return details.map( (detail, index) => {
      let { detailId, approvalInfo, summaryInfo={}, productDetailInfo={}, quantity  ,fees} = detail,
        { productCode, styleText, stylePic ,size } = productDetailInfo,
        { unitPrice } = fees,
        {  name, isNoReasonToReturn} = summaryInfo;
      return(
        <tr key={detailId} className="order-detail">
        <td className="top">
        <Link to={`/product-detail.html?productCode=${productCode}`}><img src={Hmall.cdnPath(stylePic)}></img></Link>
      </td>
      <td className="top">
        <p><Link to={`/product-detail.html?productCode=${productCode}`}>{name}</Link></p>
      <p>颜色：{styleText} 尺码：{size}</p>
      {
        isNoReasonToReturn == "Y" && <Icon name="7days" title="7天无理由退换"></Icon>
    }
      </td>
      <td className="special">
        ￥{unitPrice}
      </td>
      <td className="special">
        {quantity}
        </td>
        <td className="center">
        {
          this.getProductOperationByStatus(detail)
    }
      {
        this.getProductOperationBySign(detail, orderId)
      }
      </td>
      {
        index == 0 &&
      <td rowSpan={row} className="center top">
        <p><b>￥{account.toFixed(2)}</b></p>
      <p>（含运费：￥{freight.toFixed(2)}）</p>
      </td>
    }
      {
        index == 0 &&
        <td rowSpan={row} className="center top">
        <p>{this.getStatusDescription(status,distribution)}</p>
      <p><Link to={`/account/order-center/order-detail.html?oid=${orderId}`}>订单详情</Link></p>
      {
      (() => {
        switch(status){
          case ORDER_STATUS[2]:
          case ORDER_STATUS[3]: return <p>查看物流</p>;
          case ORDER_STATUS[4]: return <p>提货凭证</p>;
        }
      })()
      }
      </td>
      }
      {
        index == 0 &&
        <td rowSpan={row} className="center top">
        {
          this.getOperation(order)
      }
      </td>
      }
      </tr>);
    });
  }
  renderOrderRecycle(order) {
    let { status } = order;
    if( status == ORDER_STATUS[5] || status == ORDER_STATUS[6] || status == ORDER_STATUS[7]){
      return <Icon name="recycle" onClick={() => this.orderRecycle(order)}></Icon>
    }
  }
  renderOrderList(resp) {
    return resp.map( order => {
      let { creationTime, orderId, distribution } = order;
      return (<tbody key={orderId}>
        <tr className="order-title">
        <td>
        <span>{Moment(creationTime).format(HmallConfig.date_format)}</span>
      </td>
      <td colSpan="6">
        <span>订单编号：{orderId}</span>
      <span className="distribution">{this.getDistribution(distribution)}</span>
      </td>
      <td>
      {
        this.renderOrderRecycle(order)
    }
      </td>
      </tr>
      {
        this.renderOrderDetails(order)
    }
      <tr><td colSpan="8"></td></tr>
        </tbody>);
    });
  }
  handleFilter(e){
    e.preventDefault();
    let { orderid, distribution, status, start, end } = e.target,
      { pathname } = this.props.location;
    browserHistory.push({
      pathname,
      query: {
        status: status.value || undefined,
        distribution: distribution.value || undefined,
        orderId: orderid.value || undefined,
        start: start.value || undefined,
        end: end.value || undefined
      }
    });
  }
  render() {
    let { location } = this.props,
      { resp, fetch_status, total, query } = this.state,
      { page=1, start, end, distribution, status, orderId } = query;
    return (
      <div id="orderlist-div">
      <Form onSubmit={e => this.handleFilter(e)}>
  <nav>
    <SearchBox name="orderid" value={orderId} placeholder="输入商品标题或订单号进行搜索" width={203}></SearchBox>
      <label>配送方式</label>
      <ComboBox  name="distribution" value={distribution} options={distributionOptions} emptyOption="请选择"></ComboBox>
      <label>订单状态</label>
      <ComboBox  name="status" value={status} options={statusOptions} emptyOption="请选择"></ComboBox>
      <label>下单日期</label>
      <DatePicker name="start" value={start} placeholder="请选择起始时间"></DatePicker>
      <span>-</span>
      <DatePicker name="end" value={end} placeholder="请选择结束时间"></DatePicker>
      <Button type="submit" className="black" width={51} height={33} text="搜索"></Button>
      </nav>
      </Form>
      {
      (() => {
        switch(fetch_status){
          case 'uninit': return <div className="loading"></div>;
          case 'init': return resp.length ?
          <table className="order-list">
            <thead>
            <tr>
            <th colSpan="2">商品</th>
            <th width="54">单价</th>
            <th width="53">数量</th>
            <th width="98">商品操作</th>
            <th width="117">实付款</th>
            <th width="132">交易状态</th>
            <th width="159">操作</th>
            </tr>
            </thead>
            {
              this.renderOrderList(resp)
        }
        <tfoot>
        <tr>
        <td colSpan="8">
          <Pagenation page={page} pagesize={PAGE_SIZE} total={total} location={location}></Pagenation>
          </td>
          </tr>
          </tfoot>
          </table> :
        <h1 className="info">无订单</h1>;
        case 'error':return <h1 className="error">网页出错</h1>
      }
      })()
  }
  </div>
  );
  }
}
class Timer extends Component {
  componentDidMount() {
    this.clock();
  }
  componentWillUnmount() {
    this.isUnMounted = true;
  }
  clock() {
    let { order } = this.props;
    if(order.status == ORDER_STATUS[0] && order.creationTime + PAYMENT_DEADLINE > Date.now()) {
      setTimeout(() => {
        this.forceUpdate();
        this.clock();
      }, 1000, this);
    }
  }
  render() {
    let { order, onEnd } = this.props,
      time = order.creationTime + PAYMENT_DEADLINE;
    if(time <= Date.now()){
      onEnd();
      return false;
    }
    let { floor } = Math,
      last = floor((time - Date.now()) / 1000),
      hours = floor(last / 3600),
      mintues = floor((last % 3600) / 60),
      seconds = last - hours * 3600 - mintues * 60,
      hoursText = hours ? `${hours}小时`:'',
      mintuesText = mintues ? `${mintues}分`:'';
    return <p>请在<span className="notice-word">{hoursText}{mintuesText}{seconds}秒</span>内付款</p>;
  }
}
