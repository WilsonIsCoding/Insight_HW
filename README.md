# Insight HW (Quasar)
<p>之前就有用過類似的element Ui工具(element plus)，但這應該算是第一次聽到Quasar也是第一次使用，仔細看了一下官方文件，原來是一個基於vue去開發的前端框架，裡面包含了各種ui、各種渲染機制，還有各種SSR的操作，官方文件還有中文版本(?稍微翻了一下，覺得各種操作跟寫法都蠻易懂跟好理解，只是因為畢竟不是主流，網路上的討論跟各種資源還是比較少的，要找東西如果官方文件上沒有，可能就只能仰賴各位參與開源的熱情了xDD</p>

<h2>執行目標</h2>

如 [連結](https://whimsical.com/interview2-CKvQ47oi5yP6vRTEcEtAfW)

總體來說，就是要接續原本的table程式碼，要做fetch Data、hover、sort、add、delete各種資料庫操作。

<h2>實做過程</h2>
<h3>1.翻官方文件</h3>
<p>全部東西大概花了兩的半天的時間做，其中有一個半天都在翻官方文件，其中用到的組件有table、tooltip、dialog
</p>
<h3>2.實做</h3>
<p>大部分的東西都是套版套進去就可以，手寫的部分就api串接，邏輯撰寫，花了比較多的時間是在看table要同時手寫tr裡面的資料又要有selection，官方文件只有這兩種各自的寫法，但拼在一起畫面上的checkbox又會消失，想了一下才寫出來。
</p>
<h3>3.邏輯拆分</h3>
<p>一開始的code寫完後，把該拆的function拆分，邏輯拉出來，最後好像300多行的code被拆到130行左右，個人是覺得分類的方式蠻滿意的(依照util、component)工具歸工具、模組歸模組。
</p>

<h3>番外</h3>
<p>雖然作業沒有要求，但本來想說最近有在看github action，就順便部署上github page。</br>
結！！果！！ 因為api 是HTTP，github page 是https，跨域問題api打不過，只能ＱＱ了。
</p>

