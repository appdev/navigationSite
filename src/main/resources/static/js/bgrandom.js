const bgRandomList = [
        "https://static.apkdv.com/large/005BYqpggy1g24ntnrscoj31c00u0qac.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24nvmx9fyj31hc0u040f.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24nwpqfg7j31hc0u0wxs.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24nz46kl8j31hc0u0hax.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24o02f4w4j31hc0u0q9e.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24o1d7vqsj31c00u01kx.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24o5pt5cij31hc0u0npj.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24rd0zkwwj31c00u0wm9.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24sl8kd4xj31hc0u0nix.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24sml856yj31hc0u04qp.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24snuhuffj31hc0u0kjl.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24sodue4fj31hc0u0k3k.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24soo51x1j31hc0u0tsd.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24ss6pqaxj31hc0u0q6k.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24ssvgefcj31hc0u0npd.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t629p60j31hc0u07wh.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t6rhy2dj31hc0u0hba.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t77wq15j31hc0u0tlz.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t7j2mgdj31hc0u0h39.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t7vu4gdj31hc0u0h51.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t82shfvj31hc0u0wqf.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t8alq3pj31hc0u0qgo.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t8ic8zoj31hc0u0tga.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24t8oovsuj31hc0u04ae.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24tw21vyoj31hc0u0e81.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24twc5r64j31hc0u0anp.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24txkv84vj31hc0u0tzb.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24txt44koj31hc0u0wpj.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24tythaodj30zk0sg79g.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24tzp4664j31c00u0tju.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24tzxurcxj31c00u0gv5.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24u073ynjj31hc0u0k49.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24u0smk08j31hc0u01kx.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24u16tztxj31hc0u0al4.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24u1qwhsgj31hc0u0kjl.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24u20qsmfj31hc0u0aei.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24uam2wvhj31c00u0n2v.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24uaw478dj31hc0u0qnl.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24ub7o0cjj31hc0u0qnj.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24ubf2g0vj31hc0u07e1.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24ubpbu7tj31hc0u07e9.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24uc9qmcrj31hc0u07cs.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24uhwmzhwj31c00u0wv6.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24uidxdt8j31c00u01kx.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24uikwceqj31hc0u0qh0.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g24uk7165dj31hc0u042a.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2gz1uye9aj31hc0u0e81.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2gz1vrm5sj31hc0u0qv5.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2gz9uqzesj31hc0u0gqd.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2gz9x9wsnj31hc0u0489.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2gz9xewmtj31hc0u0akx.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2gz9zmcllj31c00u0jzz.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2gza0gpgpj31hc0u0jyi.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h00c67w4j31hc0u0dyj.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h09paw3sj31hc0u00wd.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h09pid4pj31c00u0gp8.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h09pykzrj31hc0u0jvm.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h09qix3fj31hc0u0gr0.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h09ztn7dj31hc0u0jyi.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0a0uda5j31c00u0ah5.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0a8zt72j31hc0u011v.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0a9w37jj31hc0u0gu8.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0abgii0j31hc0u0thy.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0ad9z4pj31hc0u0k1o.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0ae6i51j31hc0u0tii.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0ael6zjj31hc0u0dpy.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0aflygyj31hc0u0akc.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0alilf7j31hc0u0gym.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0alrkthj31hc0u0tjw.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0aot19rj318g0p0n9a.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0apu1g1j31hc0u016l.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0aq444ij31hc0u04le.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0aqe48cj31hc0u0qm9.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0arh3wyj31hc0u0nf4.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0as9h88j31hc0u0atr.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0avdttlj31c00u0ayj.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0axi49xj31hc0u04m4.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0b1pmdnj318g0p0e5i.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0b56vx2j31hc0u0b29.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0b7kl99j31c00u0e81.jpg",
        "https://static.apkdv.com/large/005BYqpggy1g2h0b8w3tmj31hc0u0x6p.jpg",
        "https://static.apkdv.com/large/005BYqpgly1g24iffpmjwj31c00u0hdt.jpg"];

function extracted() {
        let newRandomdBg = bgRandomList[Math.floor(Math.random() * bgRandomList.length)];
        let current = window.localStorage.getItem("bgSet");
        for (let i = 0; i < bgRandomList.length; i++) {
                while (current === newRandomdBg) {
                        newRandomdBg = bgRandomList[Math.floor(Math.random() * bgRandomList.length)]
                }
        }
        current = newRandomdBg;
        window.localStorage.setItem("bgSet", current);
        $("body").css("background-image", "url(" + current + "!/quality/75/format/webp)")
}

function loadImage() {
        let current = window.localStorage.getItem("bgSet");
        if (current === "" || current === null) extracted();
        else $('body').css("background-image", "url(" + current + "!/quality/75/format/webp)")
}