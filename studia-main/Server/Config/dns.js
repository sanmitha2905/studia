import dns from 'dns';

// Force Node.js to use Google's DNS servers to resolve MongoDB Atlas hostname
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

console.log('🔧 Custom DNS servers configured:', dns.getServers());
