import{_ as s,r as t,o as r,c as a,b as e,d as n,e as d,a as o}from"./app-b6485265.js";const c={},l={id:"使用kubeadm在centos8上部署kubernetes1-18",tabindex:"-1"},u=e("a",{class:"header-anchor",href:"#使用kubeadm在centos8上部署kubernetes1-18","aria-hidden":"true"},"#",-1),m={href:"https://www.kubernetes.org.cn/7189.html",target:"_blank",rel:"noopener noreferrer"},v=o(`<p>Centos8系统发布已有一段时间，不少小伙伴开始上手使用。kubernetes1.18也发布了，今天作者使用kubeadm在Centos8系统上部署kubernetes。</p><h3 id="_1-系统准备" tabindex="-1"><a class="header-anchor" href="#_1-系统准备" aria-hidden="true">#</a> 1 系统准备</h3><p>查看系统版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@localhost]# cat /etc/centos-release
CentOS Linux release 8.1.1911 (Core)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置网络</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@localhost ~]# cat /etc/sysconfig/network-scripts/ifcfg-enp0s3
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp0s3
UUID=039303a5-c70d-4973-8c91-97eaa071c23d
DEVICE=enp0s3
ONBOOT=yes
IPADDR=192.168.122.21
NETMASK=255.255.255.0
GATEWAY=192.168.122.1
DNS1=223.5.5.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加阿里源</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@localhost ~]# rm -rfv /etc/yum.repos.d/*
[root@localhost ~]# curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置主机名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.122.21 master01.paas.com master01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关闭swap，注释swap分区</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# swapoff -a
[root@master01 ~]# cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Tue Mar 31 22:44:34 2020
#
# Accessible filesystems, by reference, are maintained under &#39;/dev/disk/&#39;.
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info.
#
# After editing this file, run &#39;systemctl daemon-reload&#39; to update systemd
# units generated from this file.
#
/dev/mapper/cl-root     /                       xfs     defaults        0 0
UUID=5fecb240-379b-4331-ba04-f41338e81a6e /boot                   ext4    defaults        1 2
/dev/mapper/cl-home     /home                   xfs     defaults        0 0
#/dev/mapper/cl-swap     swap                    swap    defaults        0 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置内核参数，将桥接的IPv4流量传递到iptables的链</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# cat &gt; /etc/sysctl.d/k8s.conf &lt;&lt;EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-安装常用包" tabindex="-1"><a class="header-anchor" href="#_2-安装常用包" aria-hidden="true">#</a> 2 安装常用包</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# yum install vim bash-completion net-tools gcc -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-使用aliyun源安装docker-ce" tabindex="-1"><a class="header-anchor" href="#_3-使用aliyun源安装docker-ce" aria-hidden="true">#</a> 3 使用aliyun源安装docker-ce</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# yum install -y yum-utils device-mapper-persistent-data lvm2
[root@master01 ~]# yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
[root@master01 ~]# yum -y install docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装docker-ce如果出现以下错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# yum -y install docker-ce
CentOS-8 - Base - mirrors.aliyun.com                                                                               14 kB/s | 3.8 kB     00:00
CentOS-8 - Extras - mirrors.aliyun.com                                                                            6.4 kB/s | 1.5 kB     00:00
CentOS-8 - AppStream - mirrors.aliyun.com                                                                          16 kB/s | 4.3 kB     00:00
Docker CE Stable - x86_64                                                                                          40 kB/s |  22 kB     00:00
Error:
 Problem: package docker-ce-3:19.03.8-3.el7.x86_64 requires containerd.io &gt;= 1.2.2-3, but none of the providers can be installed
  - cannot install the best candidate for the job
  - package containerd.io-1.2.10-3.2.el7.x86_64 is excluded
  - package containerd.io-1.2.13-3.1.el7.x86_64 is excluded
  - package containerd.io-1.2.2-3.3.el7.x86_64 is excluded
  - package containerd.io-1.2.2-3.el7.x86_64 is excluded
  - package containerd.io-1.2.4-3.1.el7.x86_64 is excluded
  - package containerd.io-1.2.5-3.1.el7.x86_64 is excluded
  - package containerd.io-1.2.6-3.3.el7.x86_64 is excluded
(try to add &#39;--skip-broken&#39; to skip uninstallable packages or &#39;--nobest&#39; to use not only best candidate packages)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# wget https://download.docker.com/linux/centos/7/x86_64/edge/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm
[root@master01 ~]# yum install containerd.io-1.2.6-3.3.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再安装docker-ce即可成功 添加aliyundocker仓库加速器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# mkdir -p /etc/docker
[root@master01 ~]# tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [&quot;https://fl791z1h.mirror.aliyuncs.com&quot;]
}
EOF
[root@master01 ~]# systemctl daemon-reload
[root@master01 ~]# systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-安装kubectl、kubelet、kubeadm" tabindex="-1"><a class="header-anchor" href="#_4-安装kubectl、kubelet、kubeadm" aria-hidden="true">#</a> 4 安装kubectl、kubelet、kubeadm</h3><p>添加阿里kubernetes源</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# cat &lt;&lt;EOF &gt; /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# yum install kubectl kubelet kubeadm
[root@master01 ~]# systemctl enable kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-初始化k8s集群" tabindex="-1"><a class="header-anchor" href="#_5-初始化k8s集群" aria-hidden="true">#</a> 5 初始化k8s集群</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# kubeadm init --kubernetes-version=1.18.0  \\
--apiserver-advertise-address=192.168.122.21   \\
--image-repository registry.aliyuncs.com/google_containers  \\
--service-cidr=10.10.0.0/16 --pod-network-cidr=10.122.0.0/16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>POD的网段为: 10.122.0.0/16， api server地址就是master本机IP。</p><p>这一步很关键，由于kubeadm 默认从官网k8s.grc.io下载所需镜像，国内无法访问，因此需要通过–image-repository指定阿里云镜像仓库地址。</p><p>集群初始化成功后返回如下信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>W0408 09:36:36.121603   14098 configset.go:202] WARNING: kubeadm cannot validate component configs for API groups [kubelet.config.k8s.io kubeproxy.config.k8s.io]
[init] Using Kubernetes version: v1.18.0
[preflight] Running pre-flight checks
        [WARNING FileExisting-tc]: tc not found in system path
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using &#39;kubeadm config images pull&#39;
[kubelet-start] Writing kubelet environment file with flags to file &quot;/var/lib/kubelet/kubeadm-flags.env&quot;
[kubelet-start] Writing kubelet configuration to file &quot;/var/lib/kubelet/config.yaml&quot;
[kubelet-start] Starting the kubelet
[certs] Using certificateDir folder &quot;/etc/kubernetes/pki&quot;
[certs] Generating &quot;ca&quot; certificate and key
[certs] Generating &quot;apiserver&quot; certificate and key
[certs] apiserver serving cert is signed for DNS names [master01.paas.com kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.10.0.1 192.168.122.21]
[certs] Generating &quot;apiserver-kubelet-client&quot; certificate and key
[certs] Generating &quot;front-proxy-ca&quot; certificate and key
[certs] Generating &quot;front-proxy-client&quot; certificate and key
[certs] Generating &quot;etcd/ca&quot; certificate and key
[certs] Generating &quot;etcd/server&quot; certificate and key
[certs] etcd/server serving cert is signed for DNS names [master01.paas.com localhost] and IPs [192.168.122.21 127.0.0.1 ::1]
[certs] Generating &quot;etcd/peer&quot; certificate and key
[certs] etcd/peer serving cert is signed for DNS names [master01.paas.com localhost] and IPs [192.168.122.21 127.0.0.1 ::1]
[certs] Generating &quot;etcd/healthcheck-client&quot; certificate and key
[certs] Generating &quot;apiserver-etcd-client&quot; certificate and key
[certs] Generating &quot;sa&quot; key and public key
[kubeconfig] Using kubeconfig folder &quot;/etc/kubernetes&quot;
[kubeconfig] Writing &quot;admin.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;kubelet.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;controller-manager.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;scheduler.conf&quot; kubeconfig file
[control-plane] Using manifest folder &quot;/etc/kubernetes/manifests&quot;
[control-plane] Creating static Pod manifest for &quot;kube-apiserver&quot;
[control-plane] Creating static Pod manifest for &quot;kube-controller-manager&quot;
W0408 09:36:43.343191   14098 manifests.go:225] the default kube-apiserver authorization-mode is &quot;Node,RBAC&quot;; using &quot;Node,RBAC&quot;
[control-plane] Creating static Pod manifest for &quot;kube-scheduler&quot;
W0408 09:36:43.344303   14098 manifests.go:225] the default kube-apiserver authorization-mode is &quot;Node,RBAC&quot;; using &quot;Node,RBAC&quot;
[etcd] Creating static Pod manifest for local etcd in &quot;/etc/kubernetes/manifests&quot;
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory &quot;/etc/kubernetes/manifests&quot;. This can take up to 4m0s
[apiclient] All control plane components are healthy after 23.002541 seconds
[upload-config] Storing the configuration used in ConfigMap &quot;kubeadm-config&quot; in the &quot;kube-system&quot; Namespace
[kubelet] Creating a ConfigMap &quot;kubelet-config-1.18&quot; in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node master01.paas.com as control-plane by adding the label &quot;node-role.kubernetes.io/master=&#39;&#39;&quot;
[mark-control-plane] Marking the node master01.paas.com as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]
[bootstrap-token] Using token: v2r5a4.veazy2xhzetpktfz
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the &quot;cluster-info&quot; ConfigMap in the &quot;kube-public&quot; namespace
[kubelet-finalize] Updating &quot;/etc/kubernetes/kubelet.conf&quot; to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.122.21:6443 --token v2r5a4.veazy2xhzetpktfz \\
    --discovery-token-ca-cert-hash sha256:daded8514c8350f7c238204979039ff9884d5b595ca950ba8bbce80724fd65d4
[root@master01 ~]#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记录生成的最后部分内容，此内容需要在其它节点加入Kubernetes集群时执行。 根据提示创建kubectl</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]#  mkdir -p $HOME/.kube
[root@master01 ~]# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
[root@master01 ~]#   sudo chown $(id -u):$(id -g) $HOME/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行下面命令，使kubectl可以自动补充</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# source &lt;(kubectl completion bash)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看节点，pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# kubectl get node
NAME                STATUS     ROLES    AGE     VERSION
master01.paas.com   NotReady   master   2m29s   v1.18.0
[root@master01 ~]# kubectl get pod --all-namespaces
NAMESPACE     NAME                                        READY   STATUS    RESTARTS   AGE
kube-system   coredns-7ff77c879f-fsj9l                    0/1     Pending   0          2m12s
kube-system   coredns-7ff77c879f-q5ll2                    0/1     Pending   0          2m12s
kube-system   etcd-master01.paas.com                      1/1     Running   0          2m22s
kube-system   kube-apiserver-master01.paas.com            1/1     Running   0          2m22s
kube-system   kube-controller-manager-master01.paas.com   1/1     Running   0          2m22s
kube-system   kube-proxy-th472                            1/1     Running   0          2m12s
kube-system   kube-scheduler-master01.paas.com            1/1     Running   0          2m22s
[root@master01 ~]#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>node节点为NotReady，因为corednspod没有启动，缺少网络pod</p><h3 id="_6-安装calico网络" tabindex="-1"><a class="header-anchor" href="#_6-安装calico网络" aria-hidden="true">#</a> 6 安装calico网络</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
configmap/calico-config created
customresourcedefinition.apiextensions.k8s.io/bgpconfigurations.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/bgppeers.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/blockaffinities.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/clusterinformations.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/felixconfigurations.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/globalnetworkpolicies.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/globalnetworksets.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/hostendpoints.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/ipamblocks.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/ipamconfigs.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/ipamhandles.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/ippools.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/networkpolicies.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/networksets.crd.projectcalico.org created
clusterrole.rbac.authorization.k8s.io/calico-kube-controllers created
clusterrolebinding.rbac.authorization.k8s.io/calico-kube-controllers created
clusterrole.rbac.authorization.k8s.io/calico-node created
clusterrolebinding.rbac.authorization.k8s.io/calico-node created
daemonset.apps/calico-node created
serviceaccount/calico-node created
deployment.apps/calico-kube-controllers created
serviceaccount/calico-kube-controllers created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看pod和node</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# kubectl get pod --all-namespaces
NAMESPACE     NAME                                        READY   STATUS    RESTARTS   AGE
kube-system   calico-kube-controllers-555fc8cc5c-k8rbk    1/1     Running   0          36s
kube-system   calico-node-5km27                           1/1     Running   0          36s
kube-system   coredns-7ff77c879f-fsj9l                    1/1     Running   0          5m22s
kube-system   coredns-7ff77c879f-q5ll2                    1/1     Running   0          5m22s
kube-system   etcd-master01.paas.com                      1/1     Running   0          5m32s
kube-system   kube-apiserver-master01.paas.com            1/1     Running   0          5m32s
kube-system   kube-controller-manager-master01.paas.com   1/1     Running   0          5m32s
kube-system   kube-proxy-th472                            1/1     Running   0          5m22s
kube-system   kube-scheduler-master01.paas.com            1/1     Running   0          5m32s
[root@master01 ~]# kubectl get node
NAME                STATUS   ROLES    AGE     VERSION
master01.paas.com   Ready    master   5m47s   v1.18.0
[root@master01 ~]#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时集群状态正常</p><h3 id="_7-安装kubernetes-dashboard" tabindex="-1"><a class="header-anchor" href="#_7-安装kubernetes-dashboard" aria-hidden="true">#</a> 7 安装kubernetes-dashboard</h3><p>官方部署dashboard的服务没使用nodeport，将yaml文件下载到本地，在service里添加nodeport</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# wget  https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc7/aio/deploy/recommended.yaml
[root@master01 ~]# vim recommended.yaml
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  type: NodePort
  ports:
    - port: 443
      targetPort: 8443
      nodePort: 30000
  selector:
    k8s-app: kubernetes-dashboard
     # 网络类型
  type: NodePort

[root@master01 ~]# kubectl create -f recommended.yaml
namespace/kubernetes-dashboard created
serviceaccount/kubernetes-dashboard created
service/kubernetes-dashboard created
secret/kubernetes-dashboard-certs created
secret/kubernetes-dashboard-csrf created
secret/kubernetes-dashboard-key-holder created
configmap/kubernetes-dashboard-settings created
role.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrole.rbac.authorization.k8s.io/kubernetes-dashboard created
rolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
deployment.apps/kubernetes-dashboard created
service/dashboard-metrics-scraper created
deployment.apps/dashboard-metrics-scraper created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看pod，service</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>NAME                                        READY   STATUS    RESTARTS   AGE
dashboard-metrics-scraper-dc6947fbf-869kf   1/1     Running   0          37s
kubernetes-dashboard-5d4dc8b976-sdxxt       1/1     Running   0          37s
[root@master01 ~]# kubectl get svc -n kubernetes-dashboard
NAME                        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)         AGE
dashboard-metrics-scraper   ClusterIP   10.10.58.93    &lt;none&gt;        8000/TCP        44s
kubernetes-dashboard        NodePort    10.10.132.66   &lt;none&gt;        443:30000/TCP   44s
[root@master01 ~]#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过页面访问，推荐使用firefox浏览器 <img src="https://s4.51cto.com/images/blog/202004/08/af83a976da5eea4789542e07dff576f9.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=" alt="使用kubeadm在Centos8上部署kubernetnes1.18"> 使用token进行登录，执行下面命令获取token</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# kubectl describe secrets -n kubernetes-dashboard kubernetes-dashboard-token-t4hxz  | grep token | awk &#39;NR==3{print $2}&#39;
eyJhbGciOiJSUzI1NiIsImtpZCI6IlhJaDgyTWEzZ3FtWE9hTnJqUHN1akdHZU1pRHN3QWM2RUlQbUVOT0g0Qm8ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJlcm5ldGVzLWRhc2hib2FyZC10b2tlbi10NGh4eiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImUxOWYwMGI5LTI3MWItNDY5OS1hMjI3LTAzZWEyZTllMDE4YiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDprdWJlcm5ldGVzLWRhc2hib2FyZCJ9.Mcw9zYSbTfhaYV38vlEaI0CSomYLtb05F2AIGpyT_PjIN8xmRdnIQhWGANBDuuDjdxScSXHOytHAKdj3pzBFVw_lfU5PseBg6hmdv_EPFPh2GvRd9XCs0TE5CVX8qfHkAGKc-DltA7jPwt5VqIFjnolLLGXB-exhiU73YMG_Xy9dZE-u0KKCvSq7XZDR87P_X30JYCAZXDlxcv8iOsuI4I-wlacm6LRF6HgyJqctJNVyE7seVVIgLqetAtt9LicTo6BBozbefHeK6zqRYeITU8AHhe-PLS4xo2fey5up77v4vyPHy_SEnKOtZcBzje1XKNPolGfiXItLYF7u95m9_A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>登录后如下展示，如果没有namespace可选，并且提示找不到资源 ，那么就是权限问题 <img src="https://s4.51cto.com/images/blog/202004/08/a90ac4c5bd7fb43850707fbdbf6b0a81.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=" alt="使用kubeadm在Centos8上部署kubernetnes1.18"> 通过查看dashboard日志，得到如下 信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# kubectl logs -f -n kubernetes-dashboard kubernetes-dashboard-5d4dc8b976-sdxxt
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: namespaces is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;namespaces&quot; in API group &quot;&quot; at the cluster scope
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 GET /api/v1/cronjob/default?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 01:54:31 Getting list of all cron jobs in the cluster
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: cronjobs.batch is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;cronjobs&quot; in API group &quot;batch&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 POST /api/v1/token/refresh request from 192.168.122.21:7788: { contents hidden }
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 GET /api/v1/daemonset/default?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 GET /api/v1/deployment/default?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: daemonsets.apps is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;daemonsets&quot; in API group &quot;apps&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: pods is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;pods&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: events is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;events&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 GET /api/v1/csrftoken/token request from 192.168.122.21:7788:
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 Getting list of all deployments in the cluster
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: deployments.apps is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;deployments&quot; in API group &quot;apps&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: pods is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;pods&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: events is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;events&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: replicasets.apps is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;replicasets&quot; in API group &quot;apps&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 GET /api/v1/job/default?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 GET /api/v1/pod/default?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 01:54:31 Getting list of all jobs in the cluster
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: jobs.batch is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;jobs&quot; in API group &quot;batch&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: pods is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;pods&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: events is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;events&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 Getting list of all pods in the cluster
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: pods is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;pods&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: events is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;events&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Getting pod metrics
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 GET /api/v1/replicaset/default?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 01:54:31 Getting list of all replica sets in the cluster
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Incoming HTTP/2.0 GET /api/v1/replicationcontroller/default?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: replicasets.apps is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;replicasets&quot; in API group &quot;apps&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: pods is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;pods&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: events is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;events&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
2020/04/08 01:54:31 [2020-04-08T01:54:31Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 01:54:31 Getting list of all replication controllers in the cluster
2020/04/08 01:54:31 Non-critical error occurred during resource retrieval: replicationcontrollers is forbidden: User &quot;system:serviceaccount:kubernetes-dashboard:kubernetes-dashboard&quot; cannot list resource &quot;replicationcontrollers&quot; in API group &quot;&quot; in the namespace &quot;default&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# kubectl create clusterrolebinding serviceaccount-cluster-admin --clusterrole=cluster-admin --group=system:serviceaccount 
clusterrolebinding.rbac.authorization.k8s.io/serviceaccount-cluster-admin created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看dashboard日志</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@master01 ~]# kubectl logs -f -n kubernetes-dashboard kubernetes-dashboard-5d4dc8b976-sdxx
2020/04/08 02:07:03 Getting list of namespaces
2020/04/08 02:07:03 [2020-04-08T02:07:03Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:08 [2020-04-08T02:07:08Z] Incoming HTTP/2.0 GET /api/v1/node?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 02:07:08 [2020-04-08T02:07:08Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:08 [2020-04-08T02:07:08Z] Incoming HTTP/2.0 GET /api/v1/namespace request from 192.168.122.21:7788:
2020/04/08 02:07:08 Getting list of namespaces
2020/04/08 02:07:08 [2020-04-08T02:07:08Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:13 [2020-04-08T02:07:13Z] Incoming HTTP/2.0 GET /api/v1/node?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 02:07:13 [2020-04-08T02:07:13Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:13 [2020-04-08T02:07:13Z] Incoming HTTP/2.0 GET /api/v1/namespace request from 192.168.122.21:7788:
2020/04/08 02:07:13 Getting list of namespaces
2020/04/08 02:07:13 [2020-04-08T02:07:13Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:18 [2020-04-08T02:07:18Z] Incoming HTTP/2.0 GET /api/v1/node?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 02:07:18 [2020-04-08T02:07:18Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:18 [2020-04-08T02:07:18Z] Incoming HTTP/2.0 GET /api/v1/namespace request from 192.168.122.21:7788:
2020/04/08 02:07:18 Getting list of namespaces
2020/04/08 02:07:18 [2020-04-08T02:07:18Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:23 [2020-04-08T02:07:23Z] Incoming HTTP/2.0 GET /api/v1/node?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 02:07:23 [2020-04-08T02:07:23Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:23 [2020-04-08T02:07:23Z] Incoming HTTP/2.0 GET /api/v1/namespace request from 192.168.122.21:7788:
2020/04/08 02:07:23 Getting list of namespaces
2020/04/08 02:07:23 [2020-04-08T02:07:23Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:28 [2020-04-08T02:07:28Z] Incoming HTTP/2.0 GET /api/v1/node?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 02:07:28 [2020-04-08T02:07:28Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:28 [2020-04-08T02:07:28Z] Incoming HTTP/2.0 GET /api/v1/namespace request from 192.168.122.21:7788:
2020/04/08 02:07:28 Getting list of namespaces
2020/04/08 02:07:28 [2020-04-08T02:07:28Z] Outcoming response to 192.168.122.21:7788 with 200 status code
2020/04/08 02:07:33 [2020-04-08T02:07:33Z] Incoming HTTP/2.0 GET /api/v1/node?itemsPerPage=10&amp;page=1&amp;sortBy=d,creationTimestamp request from 192.168.122.21:7788:
2020/04/08 02:07:33 [2020-04-08T02:07:33Z] Outcoming response to 192.168.122.21:7788 with 200 status code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时再查看dashboard，即可看到有资源展示 <img src="https://www.kubernetes.org.cn/img/2020/04/k8s-dashboard.png" alt="img"></p><h4 id="按照以上步骤可在centos8成功安装k8s1-18版本-如遇到问题-可以在评价区留言。" tabindex="-1"><a class="header-anchor" href="#按照以上步骤可在centos8成功安装k8s1-18版本-如遇到问题-可以在评价区留言。" aria-hidden="true">#</a> 按照以上步骤可在CentOS8成功安装k8s1.18版本，如遇到问题，可以在评价区留言。</h4>`,62);function b(p,g){const i=t("ExternalLinkIcon");return r(),a("div",null,[e("h1",l,[u,n(),e("a",m,[n("使用kubeadm在Centos8上部署kubernetes1.18"),d(i)])]),v])}const h=s(c,[["render",b],["__file","centos8_k8v18.html.vue"]]);export{h as default};
