import{_ as t,r,o as c,c as o,b as e,d as n,e as i,a as s}from"./app-b6485265.js";const d={},l=s(`<h1 id="kubernetes" tabindex="-1"><a class="header-anchor" href="#kubernetes" aria-hidden="true">#</a> Kubernetes</h1><p>https://my.oschina.net/u/585210/blog/3062053</p><p>https://www.jianshu.com/p/d42ef0eff63f</p><p>https://time.geekbang.org/column/article/39724</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>master 节点需要2G 内存</p><p>node 节点 4G 内存</p><p>关闭防火墙（两台机器都做）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl stop firewalld
setenforce 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>更改主机名（两台机器都做）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hostnamectl set-hostname  master
bash #直接生效
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>关闭swap（两台机器都做）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>swapoff -a  # 临时
# vi /etc/fstab  # 永久

 
#关闭系统的Swap
swapoff -a
 
#永久生效
echo &quot;vm.swappiness=0&quot; &gt;&gt; /etc/sysctl.d/k8s.conf
 
#修改 /etc/fstab 文件，注释掉 SWAP 的自动挂载
#/dev/mapper/centos-swap swap                    swap    defaults        0 0

vim /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1    
vm.swappiness=0
sysctl --system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置host（两台机器都做）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &lt;&lt;EOF &gt;&gt;/etc/hosts

192.168.71.60 master
192.168.71.61 node1
192.168.71.62 node2

EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更改源（两台机器都做）</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>cd /etc/yum.repos.d/
rm <span class="token punctuation">-</span>f *
curl <span class="token punctuation">-</span>o CentOS<span class="token punctuation">-</span>Base.repo http<span class="token punctuation">:</span>//mirrors.aliyun.com/repo/Centos<span class="token punctuation">-</span>7.repo
curl <span class="token punctuation">-</span>o docker<span class="token punctuation">-</span>ce.repo https<span class="token punctuation">:</span>//download.docker.com/linux/centos/docker<span class="token punctuation">-</span>ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
cat &lt;&lt;EOF &gt; /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>yum clean all   
yum makecache   
yum repolist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装docker（两台机器都做）</p><p>查看docker可安装的版本可用yum list docker-ce --showduplicates|grep &quot;^doc&quot;|sort -r</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install -y docker-ce
systemctl enable docker &amp;&amp; systemctl start docker  #设置docker开机启动
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装kubelet、kubeadm、kubectl、kubernetes-cni（两台机器都做）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install -y kubeadm
systemctl enable kubelet.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化kubeadm（只在master机器执行）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm init --pod-network-cidr=10.244.0.0/16  --apiserver-advertise-address=192.168.10.130 --image-repository registry.aliyuncs.com/google_containers --service-cidr=10.1.0.0/16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm init <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm.yml --upload-certs <span class="token operator">|</span> <span class="token function">tee</span> kubeadm-init.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据提示执行下面语句(只在master机器执行）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="下载-calico-配置文件并修改" tabindex="-1"><a class="header-anchor" href="#下载-calico-配置文件并修改" aria-hidden="true">#</a> 下载 Calico 配置文件并修改</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://docs.projectcalico.org/v3.8/manifests/calico.yaml
vi calico.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改第 611 行，将 <code>192.168.0.0/16</code> 修改为 <code>10.244.0.0/16</code>，可以通过如下命令快速查找</p><ul><li>显示行号：<code>:set number</code></li><li>查找字符：<code>/要查找的字符</code>，输入小写 <code>n</code> 下一个匹配项，输入大写 <code>N</code> 上一个匹配项</li></ul><p><img src="http://www.qfdmy.com/wp-content/uploads/2019/08/f426d4f38ca346f.png" alt="img"></p><h2 id="安装网络插件-calico" tabindex="-1"><a class="header-anchor" href="#安装网络插件-calico" aria-hidden="true">#</a> 安装网络插件 Calico</h2><blockquote><p><strong>注意：</strong> 截止到文章发表日期 2019 年 07 月 20 日，Calico 官方版本为 3.8</p></blockquote>`,36),u={href:"http://www.qfdmy.com/wp-content/themes/quanbaike/go.php?url=aHR0cHM6Ly9kb2NzLnByb2plY3RjYWxpY28ub3JnL3YzLjgvZ2V0dGluZy1zdGFydGVkL2t1YmVybmV0ZXMv",target:"_blank",rel:"noopener noreferrer"},p=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl apply -f calico.yaml
# 输出如下configmap/calico-config createdcustomresourcedefinition.apiextensions.k8s.io/felixconfigurations.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/ipamblocks.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/blockaffinities.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/ipamhandles.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/ipamconfigs.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/bgppeers.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/bgpconfigurations.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/ippools.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/hostendpoints.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/clusterinformations.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/globalnetworkpolicies.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/globalnetworksets.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/networkpolicies.crd.projectcalico.org createdcustomresourcedefinition.apiextensions.k8s.io/networksets.crd.projectcalico.org createdclusterrole.rbac.authorization.k8s.io/calico-kube-controllers createdclusterrolebinding.rbac.authorization.k8s.io/calico-kube-controllers createdclusterrole.rbac.authorization.k8s.io/calico-node createdclusterrolebinding.rbac.authorization.k8s.io/calico-node createddaemonset.extensions/calico-node createdserviceaccount/calico-node createddeployment.extensions/calico-kube-controllers createdserviceaccount/calico-kube-controllers created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="验证安装是否成功" tabindex="-1"><a class="header-anchor" href="#验证安装是否成功" aria-hidden="true">#</a> 验证安装是否成功</h2><ul><li>查看 Calico 网络插件处于 <strong>Running</strong> 状态即表示安装成功</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>watch kubectl get pods --all-namespaces
# 输出如下NAMESPACE     NAME                                        READY   STATUS    RESTARTS   AGEkube-system   calico-kube-controllers-658558ddf8-9zzjg    1/1     Running   0          90skube-system   calico-node-9cr5f                           1/1     Running   0          91skube-system   calico-node-n99mz                           1/1     Running   0          91skube-system   calico-node-nl67v                           1/1     Running   0          91skube-system   coredns-bccdc95cf-9s4bm                     1/1     Running   0          56mkube-system   coredns-bccdc95cf-s8ggd                     1/1     Running   0          56mkube-system   etcd-kubernetes-master                      1/1     Running   0          55mkube-system   kube-apiserver-kubernetes-master            1/1     Running   0          55mkube-system   kube-controller-manager-kubernetes-master   1/1     Running   0          55mkube-system   kube-proxy-8s87d                            1/1     Running   0          36mkube-system   kube-proxy-cbnlb                            1/1     Running   0          36mkube-system   kube-proxy-vwhxj                            1/1     Running   0          56mkube-system   kube-scheduler-kubernetes-master            1/1     Running   0          55m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查看节点状态处于 <strong>Ready</strong> 即表示安装成功</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get node
# 输出如下
NAME                 STATUS   ROLES    AGE   VERSIONkubernetes-master    Ready    master   57m   v1.15.0kubernetes-node-01   Ready    &lt;none&gt;   37m   v1.15.0kubernetes-node-02   Ready    &lt;none&gt;   36m   v1.15.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker安装k8s链接不到国外镜像" tabindex="-1"><a class="header-anchor" href="#docker安装k8s链接不到国外镜像" aria-hidden="true">#</a> docker安装k8s链接不到国外镜像</h2><p>解决方案： docker pull mirrorgooglecontainers/etcd:2.0.12 docker tag docker.io/mirrorgooglecontainers/etcd:2.0.12 gcr.io/google_containers/etcd:2.0.12 docker images</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run --net=host -d gcr.io/google_containers/etcd:2.0.12 /usr/local/bin/etcd --addr=127.0.0.1:4001 --bind-addr=0.0.0.0:4001 --data-dir=/var/etcd/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull mirrorgooglecontainers/hyperkube:v1.0.1

<span class="token function">docker</span> tag docker.io/mirrorgooglecontainers/hyperkube:v1.0.1 gcr.io/google_containers/hyperkube:v1.0.1

<span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
    <span class="token parameter variable">--volume</span><span class="token operator">=</span>/:/rootfs:ro <span class="token punctuation">\\</span>
    <span class="token parameter variable">--volume</span><span class="token operator">=</span>/sys:/sys:ro <span class="token punctuation">\\</span>
    <span class="token parameter variable">--volume</span><span class="token operator">=</span>/dev:/dev <span class="token punctuation">\\</span>
    <span class="token parameter variable">--volume</span><span class="token operator">=</span>/var/lib/docker/:/var/lib/docker:ro <span class="token punctuation">\\</span>
    <span class="token parameter variable">--volume</span><span class="token operator">=</span>/var/lib/kubelet/:/var/lib/kubelet:rw <span class="token punctuation">\\</span>
    <span class="token parameter variable">--volume</span><span class="token operator">=</span>/var/run:/var/run:rw <span class="token punctuation">\\</span>
    <span class="token parameter variable">--net</span><span class="token operator">=</span>host <span class="token punctuation">\\</span>
    <span class="token parameter variable">--pid</span><span class="token operator">=</span>host <span class="token punctuation">\\</span>
    <span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
    <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
    gcr.io/google_containers/hyperkube:v1.0.1 <span class="token punctuation">\\</span>
    /hyperkube kubelet <span class="token parameter variable">--containerized</span> --hostname-override<span class="token operator">=</span><span class="token string">&quot;127.0.0.1&quot;</span> <span class="token parameter variable">--address</span><span class="token operator">=</span><span class="token string">&quot;0.0.0.0&quot;</span> --api-servers<span class="token operator">=</span>http://localhost:8080 <span class="token parameter variable">--config</span><span class="token operator">=</span>/etc/kubernetes/manifests
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="卸载-kubeadm" tabindex="-1"><a class="header-anchor" href="#卸载-kubeadm" aria-hidden="true">#</a> 卸载 kubeadm</h2><p>kubeadm reset</p><p>rm -rf $HOME/.kube</p><p>异常</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> [WARNING IsDockerSystemdCheck]: detected &quot;cgroupfs&quot; as the Docker cgroup driver. The recommended driver is &quot;systemd&quot;. Please follow the guide at https://kubernetes.io/docs/setup/cri/
error execution phase preflight: [preflight] Some fatal errors occurred:
        [ERROR FileContent--proc-sys-net-ipv4-ip_forward]: /proc/sys/net/ipv4/ip_forward contents are not set to 1
[preflight] If you know what you are doing, you can make a check non-fatal with \`--ignore-preflight-errors=...\`
To see the stack trace of this error execute with --v=5 or higher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;1&quot;</span> <span class="token operator">&gt;</span>/proc/sys/net/bridge/bridge-nf-call-iptables
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>vi /etc/sysctl.conf 编辑这个文件然后找到net.ipv4.ip_forward = 0 将这个值0改为1 保存退出</p><p>然后执行sysctl -p 命令 再去查看 proc/sys/net/ipv4/ip_forward 里面的值已经是1了！</p><h2 id="单机版kubernetes" tabindex="-1"><a class="header-anchor" href="#单机版kubernetes" aria-hidden="true">#</a> 单机版kubernetes</h2><p>https://blog.csdn.net/weixin_42182501/article/details/104347303</p><p>阿里云安装kubeadm</p><p>https://blog.csdn.net/xiunai78/article/details/88967554</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>[kubelet-check] Initial timeout of 40s passed.</p><p>journalctl -u kubelet 查看到的错误日志</p>`,26),m={id:"使用kubeadm在centos8上部署kubernetes1-18",tabindex:"-1"},v=e("a",{class:"header-anchor",href:"#使用kubeadm在centos8上部署kubernetes1-18","aria-hidden":"true"},"#",-1),b={href:"https://www.kubernetes.org.cn/7189.html",target:"_blank",rel:"noopener noreferrer"},k=s('<p>https://www.kubernetes.org.cn/7189.html</p><h2 id="k8s升级" tabindex="-1"><a class="header-anchor" href="#k8s升级" aria-hidden="true">#</a> K8s升级</h2><p>https://www.jianshu.com/p/e4c14880a9ba</p><h2 id="selector" tabindex="-1"><a class="header-anchor" href="#selector" aria-hidden="true">#</a> selector</h2><p>deployment 与 deployment 中 template app selector 可以相同不影响</p><p>service 中 selector 只要pod 的label 一直就会选择</p><p>matchLabels: 比较版lable 相同</p><p>matcheExpressions：{key:label_key,operator:In,values:[dev,test]}</p><p>label_key: dev</p><p>kubectl get pods -l app=k8s</p><p>kubectl get pods -l &#39;app in (k8s)&#39;</p><p>设置标签</p><p>kubectl label no k8s app=k8s</p><p>查看标签</p><p>kubectl get no --show-labels</p><p>删除标签</p><p>kubectl label no k8s app-</p>',17);function g(h,x){const a=r("ExternalLinkIcon");return c(),o("div",null,[l,e("p",null,[n("参考官方文档安装："),e("a",u,[n("https://docs.projectcalico.org/v3.8/getting-started/kubernetes/"),i(a)])]),p,e("h2",m,[v,n(),e("a",b,[n("使用kubeadm在Centos8上部署kubernetes1.18"),i(a)])]),k])}const f=t(d,[["render",g],["__file","index.html.vue"]]);export{f as default};
