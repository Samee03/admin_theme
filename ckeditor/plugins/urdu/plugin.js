( function() {

    var codes= new Array();
    codes['a']=0x0627;
    codes['b']=0x0628;
    codes['c']=0x0686;
    codes['d']=0x062F;
    codes['e']=0x0639;
    codes['f']=0x0641;
    codes['g']=0x06AF;
    codes['h']=0x06BE;
    codes['i']=0x06CC;
    codes['j']=0x062C;
    codes['k']=0x06A9;
    codes['l']=0x0644;
    codes['m']=0x0645;
    codes['n']=0x0646;
    codes['o']=0x06C1;
    codes['p']=0x067E;
    codes['q']=0x0642;
    codes['r']=0x0631;
    codes['s']=0x0633;
    codes['t']=0x062A;
    codes['u']=0x0626;
    codes['v']=0x0637;
    codes['w']=0x0648;
    codes['x']=0x0634;
    codes['y']=0x06D2;
    codes['z']=0x0632;

    codes['A']=0x0622;
    codes['C']=0x062B;
    codes['D']=0x0688;
    codes['E']=0x0651;
    codes['F']=0x064D;
    codes['G']=0x063A;
    codes['H']=0x062D;
    codes['I']=0x0670;
    codes['J']=0x0636;
    codes['K']=0x062E;
    codes['L']=0x0628;
    codes['M']=0x064B;
    codes['N']=0x06BA;
    codes['O']=0x06C3;
    codes['P']=0x064F;
    codes['R']=0x0691;
    codes['S']=0x0635;
    codes['T']=0x0679;
    codes['U']=0x0621;
    codes['V']=0x0638;
    codes['W']=0x0624;
    codes['X']=0x0698;
    codes['Y']=0x0601; //0x0656;
    codes['Z']=0x0630;

    codes['>']=0x0650;
    codes['<']=0x064E;
    codes[String.fromCharCode(32)]=32;
    codes[String.fromCharCode(13)]=13;
    codes[':']=0x061B;
    codes[';']=0x061B;
    codes[String.fromCharCode(39)]=0x2018;
    codes[String.fromCharCode(34)]=0x201C;
    codes[String.fromCharCode(46)]=0x06D4;
    codes[String.fromCharCode(44)]=0x060C;
    codes['!']= 0x0021;
    codes['?']=0x061F;
    codes[':']=58;

    //codes['[']=0x0654;
    //codes[']']=0x0655;
    codes['[']=0x201C;
    codes[']']=0x201D;
    codes['{']=0x2018;
    codes['}']=0x2019;
    codes['~']=0x0653;
    codes['^']=0x0652;
    codes['/']=0x002F;
    codes['\\']=0x060E;
    codes['L']=0x064C;
    codes['+']=0x002B;
    codes['-']=0x002D;
    codes['_']=0x0640;
    codes['*']=0x00D7;
    codes[String.fromCharCode(47)]=0x00F7;
    codes[String.fromCharCode(37)]=0x066A;
    codes['(']=0x0028;
    codes[')']=0x0029;
    codes['=']=0x003D;
    codes['´']=0x0657;

    codes['0']=0x30;
    codes['1']=0x31;
    codes['2']=0x32;
    codes['3']=0x33;
    codes['4']=0x34;
    codes['5']=0x35;
    codes['6']=0x36;
    codes['7']=0x37;
    codes['8']=0x38;
    codes['9']=0x39;

    isUrdu=true;
    var urdueditor_lang = 1;        // 1: Urdu, 0: English
    //var isiri2901_nativelang = 0;  // 1: Urdu, 0: English


    function DenIE_OnKeyDown( e )
    {
        var charCode = e.keyCode;
        if (e.ctrlKey && (charCode==32))
        {
            if (urdueditor_lang == 0)
                urdueditor_lang = 1;
            else
                urdueditor_lang = 0;
            try {
                e.preventDefault();
            } catch (err) {
            }
            return false;
        }
    }

    function DenIE_OnKeyPress( e )
    {
        if(urdueditor_lang!=1) return true;
        var charCode = e.keyCode;
        var whichASC = charCode ;
        var whichChar = String.fromCharCode(whichASC); // key's character
        e.keyCode= codes[whichChar];
    }

    var DenGecko_OnKeyDown = function(e) {
        var charCode = (e.charCode) ? e.charCode :
            ((e.keyCode) ? e.keyCode :
                ((e.which) ? e.which : 0));
        if (e.ctrlKey && (charCode==32))
        {
            if (urdueditor_lang == 0)
                urdueditor_lang = 1;
            else
                urdueditor_lang = 0;
            try {
                e.preventDefault();
            } catch (err) {
            }
            return false;
        }
    };

    var DenGecko_OnKeyPress = function(e) {
        if(urdueditor_lang!=1) return true;
        var charCode = e.charCode;
        var whichASC = charCode ;
        var whichChar = String.fromCharCode(whichASC); // key's character
        if((charCode==13) || (charCode==8)|| (charCode==37) || (charCode==39) ||  (charCode==38)|| (charCode==40)|| (charCode==33) || (charCode==34) || (charCode==50)  ) return;

        if (e.bubbles==false)
            return true;

        if (whichASC >= 0x00FF) {
            isUrdu=true;
        }
        else
        {
            isUrdu=false;
        }

        // Avoid processing if control or higher than ASCII
        // Or ctrl or alt is pressed.
        if (whichASC < 0x0020 || whichASC >= 0x007F || e.ctrlKey || e.altKey || e.metaKey)
            return true;
        var newkey;
        newkey = codes[whichChar];
        if (newkey == whichASC)
            return true;
        //console.debug(whichASC);
        txt=String.fromCharCode(codes[whichChar]);
        var newEvent = null;
        try
        {
            var newEvent = document.createEvent("KeyEvents");
            newEvent.initKeyEvent("keypress", true, true, window,false, false, false, false, 0, codes[whichChar]);
        }
        catch(ex)
        {
            newEvent = document.createEvent("KeyboardEvents");
            newEvent.initKeyEvent('keypress', false, true, window, false, false, false, false, codes[whichChar], 0);
        }
        e.preventDefault();
        e.target.dispatchEvent(newEvent);
    }


    CKEDITOR.plugins.add( 'urdu',
        {
            init : function( editor )
            {

                editor.on( 'contentDom', function( e ) {

                    var doc = editor.document.$;
                    if ( CKEDITOR.env.ie ) {        // If Internet Explorer.
                        doc.attachEvent("onkeydown", DenIE_OnKeyDown ) ;
                        doc.attachEvent("onkeypress", DenIE_OnKeyPress ) ;
                    } else {                // If Gecko.
                        doc.addEventListener( 'keydown', DenGecko_OnKeyDown, true ) ;
                        doc.addEventListener( 'keypress', DenGecko_OnKeyPress, true ) ;
                    }
                });

            } //Init
        } );

})();