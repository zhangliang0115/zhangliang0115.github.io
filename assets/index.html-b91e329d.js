import{_ as e,r as t,o,c as p,b as n,d as s,e as i,a as l}from"./app-b6485265.js";const c={},u=n("h1",{id:"elasticsearch",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#elasticsearch","aria-hidden":"true"},"#"),s(" Elasticsearch")],-1),r=n("h2",{id:"docker-安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#docker-安装","aria-hidden":"true"},"#"),s(" docker 安装")],-1),d={href:"https://time.geekbang.org/course/intro/197",target:"_blank",rel:"noopener noreferrer"},k=l(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;2.2&#39;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT demo
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询索引" tabindex="-1"><a class="header-anchor" href="#查询索引" aria-hidden="true">#</a> 查询索引</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /demo/_search
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>           
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="create-document-自动生成-id" tabindex="-1"><a class="header-anchor" href="#create-document-自动生成-id" aria-hidden="true">#</a> create document. 自动生成 _id</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST demo/_doc
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;name1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询所有" tabindex="-1"><a class="header-anchor" href="#查询所有" aria-hidden="true">#</a> 查询所有</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET demo/_search
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="create-document-指定id-如果id-存在-报错" tabindex="-1"><a class="header-anchor" href="#create-document-指定id-如果id-存在-报错" aria-hidden="true">#</a> create document. 指定ID 如果id 存在，报错</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT demo/_doc/<span class="token number">1</span>?op_type=create
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;name1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="get-document-by-id" tabindex="-1"><a class="header-anchor" href="#get-document-by-id" aria-hidden="true">#</a> get document by id</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET demo/_doc/<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="全量更新文档-version-1" tabindex="-1"><a class="header-anchor" href="#全量更新文档-version-1" aria-hidden="true">#</a> 全量更新文档 version+1</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT demo/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;name1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age1&quot;</span><span class="token operator">:</span><span class="token number">30</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部分字段更新或者增加字段" tabindex="-1"><a class="header-anchor" href="#部分字段更新或者增加字段" aria-hidden="true">#</a> 部分字段更新或者增加字段</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST demo/_update/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;doc&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token string">&quot;测试部分字段更新&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除索引-index" tabindex="-1"><a class="header-anchor" href="#删除索引-index" aria-hidden="true">#</a> 删除索引(index)</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="删除单个doc" tabindex="-1"><a class="header-anchor" href="#删除单个doc" aria-hidden="true">#</a> 删除单个doc</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE demo/_doc/a1sDeG0BFSgMS0lBQWHq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="批量执行" tabindex="-1"><a class="header-anchor" href="#批量执行" aria-hidden="true">#</a> 批量执行</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST _bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;10&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;field1&quot;</span><span class="token operator">:</span><span class="token string">&quot;value1&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;delete&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;20&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;create&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;30&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;field2&quot;</span><span class="token operator">:</span><span class="token string">&quot;value2&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;update&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;10&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;doc&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;field3&quot;</span><span class="token operator">:</span><span class="token string">&quot;value3&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="批量获取" tabindex="-1"><a class="header-anchor" href="#批量获取" aria-hidden="true">#</a> 批量获取</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET _mget
<span class="token punctuation">{</span>
  <span class="token property">&quot;docs&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;1&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
       <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">,</span>
       <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;10&quot;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="批量查询" tabindex="-1"><a class="header-anchor" href="#批量查询" aria-hidden="true">#</a> 批量查询</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST demo/_msearch
<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token string">&quot;shops&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分词" tabindex="-1"><a class="header-anchor" href="#分词" aria-hidden="true">#</a> 分词</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET shops/_search
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="指定-analyzer-进行测试" tabindex="-1"><a class="header-anchor" href="#指定-analyzer-进行测试" aria-hidden="true">#</a> 指定 Analyzer 进行测试</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET shops/_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;standard&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span><span class="token string">&quot;中国石化裕翠加油站&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指定索引的字段进行测试" tabindex="-1"><a class="header-anchor" href="#指定索引的字段进行测试" aria-hidden="true">#</a> 指定索引的字段进行测试</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET shops/_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span><span class="token string">&quot;中国石化裕翠加油站&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ik-max-word-会将文本做最细粒度的拆分" tabindex="-1"><a class="header-anchor" href="#ik-max-word-会将文本做最细粒度的拆分" aria-hidden="true">#</a> ik_max_word: 会将文本做最细粒度的拆分</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET shops/_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span><span class="token string">&quot;我是中国人&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ik-smart-会做最粗粒度的拆分" tabindex="-1"><a class="header-anchor" href="#ik-smart-会做最粗粒度的拆分" aria-hidden="true">#</a> ik_smart: 会做最粗粒度的拆分</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET shops/_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_smart&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span><span class="token string">&quot;人之初,性本善&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37);function v(m,b){const a=t("ExternalLinkIcon");return o(),p("div",null,[u,r,n("p",null,[n("a",d,[s("https://time.geekbang.org/course/intro/197"),i(a)])]),k])}const q=e(c,[["render",v],["__file","index.html.vue"]]);export{q as default};
