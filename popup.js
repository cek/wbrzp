document.getElementById("apply_button").addEventListener('click', () => {
    console.log("Popup DOM parsed");

    function applyResults() 
    {
        var info = document.getElementById("dq_info");
        if (info == null)
        {
            // create it if it doesn't exist
            var container = document.getElementById('postform');
            var firstChild = container.childNodes[1];
            info = document.createElement('pre');
            info.id = "dq_info";
            firstChild.insertAdjacentElement("afterend", info);
        }
        info.innerHTML = "";
        var f = {
            NAME : 0,
            STRAVA_ID : 1,
            ZWIFT_ID : 2,
            FINAL_CAT : 3,
            TIME : 4,
            WEIGHT : 5,
            HEIGHT : 6,
            TRAINER : 7,
            POWER : 8,
            HR : 9,
            ORIG_CAT : 10,
            AGE : 11,
            PU_PENALTY : 12,
            GENDER : 13,
            LIMIT_PENALTY : 14,
            TICK_APPLIED : 15
        };

        var node = document.getElementById("uploaded_results");
        var lines = node.innerHTML.split('\n');
        var numDQ = 0;
        node.value = "";
        for (var i = 0; i < lines.length; i++)
        {
            var l = lines[i].split(',');
            if (l[f.FINAL_CAT] != 'A' && l[f.FINAL_CAT] != 'B')
            {
                node.value += lines[i] + '\n';
                continue;
            }
            if (l[f.TRAINER] == "zPower")
            {
                info.innerHTML += l[f.NAME] + " (" + l[f.ORIG_CAT] + " -> " + l[f.FINAL_CAT] + ") Zpower DQ'd\n";
                numDQ++;
                l[f.FINAL_CAT] = "ZP";
            }
            else if (l[f.HR] == 0)
            {
                info.innerHTML += l[f.NAME] + " (" + l[f.ORIG_CAT] + " -> " + l[f.FINAL_CAT] + ") HRM DQ'd\n";
                numDQ++;
                l[f.FINAL_CAT] = "HR";
            }
            node.value += l.join(',') + '\n';
        }
        info.innerHTML += numDQ + (numDQ == 1 ? " rider" : " riders") + " DQ'd\n";
    }
    chrome.tabs.executeScript({
        code: '(' + applyResults + ')();'
    }, (results) => {
        console.log('Popup script:')
        console.log(results[0]);
    });
});
