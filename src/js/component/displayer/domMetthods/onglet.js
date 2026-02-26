function oglt(input1, input2) {
    const btns = document.querySelectorAll(input1);
    const ctns = document.querySelectorAll(input2);
  
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.ogtl;
            console.log("Click ! Onglet : " + index);
    
            if (btn.classList.contains('active')) return;
    
            btns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
    
            ctns.forEach(ctn => {
                if (ctn.dataset.ogtl === index) {
                    ctn.classList.add('active');
                } else {
                    ctn.classList.remove('active');
                }
            });
        });
    });
}

oglt(".btn", ".ctn");
oglt(".ongletBtn", ".ongletSec");


export function ongletSelector(in1) {
    wdw.document.querySelectorAll(".ongletSec").forEach(ctn => {
        if (ctn.dataset.ogtl === in1.toString()) {
            ctn.classList.add('active');
        } else {
            ctn.classList.remove('active');
        }
    });
}