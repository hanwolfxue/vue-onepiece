/**
 * Created by kaiyuyuan on 17/5/15.
 */
var i = 0;
function timedCount() {
  for (var j = 0, sum = 0; j < 100; j++) {
    for (var i = 0; i < 100000000; i++) {
      sum += i;
    }
  }
  postMessage(sum);
}

postMessage('before computing' + new Date());
timedCount();
postMessage('After computing,' + new Date());
