import{_ as e,r as t,o as i,c as l,b as n,d as s,e as c,a as p}from"./app-b6485265.js";const o={},u=n("h1",{id:"大数据",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#大数据","aria-hidden":"true"},"#"),s(" 大数据")],-1),r=n("h2",{id:"elasticsearch",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#elasticsearch","aria-hidden":"true"},"#"),s(" Elasticsearch")],-1),k={href:"https://time.geekbang.org/course/intro/197",target:"_blank",rel:"noopener noreferrer"},d=p(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;2.2&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">cerebro</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> lmenezes/cerebro<span class="token punctuation">:</span>0.8.3
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> cerebro
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">-</span>Dhosts.0.host=http<span class="token punctuation">:</span>//elasticsearch<span class="token punctuation">:</span><span class="token number">9200</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> es72net
  <span class="token key atrule">kibana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.elastic.co/kibana/kibana<span class="token punctuation">:</span>7.2.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> kibana72
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token comment">#- I18N_LOCALE=zh-CN</span>
      <span class="token punctuation">-</span> XPACK_GRAPH_ENABLED=true
      <span class="token punctuation">-</span> TIMELION_ENABLED=true
      <span class="token punctuation">-</span> XPACK_MONITORING_COLLECTION_ENABLED=&quot;true&quot;
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5601:5601&quot;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> es72net
  <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.elastic.co/elasticsearch/elasticsearch<span class="token punctuation">:</span>7.2.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> es72_01
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> cluster.name=geektime
      <span class="token punctuation">-</span> node.name=es72_01
      <span class="token punctuation">-</span> bootstrap.memory_lock=true
      <span class="token punctuation">-</span> <span class="token string">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span>
      <span class="token punctuation">-</span> discovery.seed_hosts=es72_01<span class="token punctuation">,</span>es72_02
      <span class="token punctuation">-</span> network.publish_host=elasticsearch
      <span class="token punctuation">-</span> cluster.initial_master_nodes=es72_01<span class="token punctuation">,</span>es72_02
    <span class="token key atrule">ulimits</span><span class="token punctuation">:</span>
      <span class="token key atrule">memlock</span><span class="token punctuation">:</span>
        <span class="token key atrule">soft</span><span class="token punctuation">:</span> <span class="token number">-1</span>
        <span class="token key atrule">hard</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> es72data1<span class="token punctuation">:</span>/usr/share/elasticsearch/data
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 9200<span class="token punctuation">:</span><span class="token number">9200</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> es72net
  <span class="token key atrule">elasticsearch2</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.elastic.co/elasticsearch/elasticsearch<span class="token punctuation">:</span>7.2.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> es72_02
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> cluster.name=geektime
      <span class="token punctuation">-</span> node.name=es72_02
      <span class="token punctuation">-</span> bootstrap.memory_lock=true
      <span class="token punctuation">-</span> <span class="token string">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span>
      <span class="token punctuation">-</span> discovery.seed_hosts=es72_01<span class="token punctuation">,</span>es72_02
      <span class="token punctuation">-</span> network.publish_host=elasticsearch
      <span class="token punctuation">-</span> cluster.initial_master_nodes=es72_01<span class="token punctuation">,</span>es72_02
    <span class="token key atrule">ulimits</span><span class="token punctuation">:</span>
      <span class="token key atrule">memlock</span><span class="token punctuation">:</span>
        <span class="token key atrule">soft</span><span class="token punctuation">:</span> <span class="token number">-1</span>
        <span class="token key atrule">hard</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> es72data2<span class="token punctuation">:</span>/usr/share/elasticsearch/data
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> es72net


<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">es72data1</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> local
  <span class="token key atrule">es72data2</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> local

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">es72net</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function v(m,b){const a=t("ExternalLinkIcon");return i(),l("div",null,[u,r,n("p",null,[n("a",k,[s("https://time.geekbang.org/course/intro/197"),c(a)])]),d])}const y=e(o,[["render",v],["__file","index.html.vue"]]);export{y as default};
