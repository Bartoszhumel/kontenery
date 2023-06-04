
import React, { useState, useEffect } from 'react'
export default function Menu() {
    return (
        <div className="App">
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick"></input>
                    <input type="hidden" name="hosted_button_id" value="6SZQ7DE4QWEN2"></input>
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal – Płać wygodnie i bezpiecznie"></input>
                            <img alt="" border="0" src="https://www.paypalobjects.com/pl_PL/i/scr/pixel.gif" width="1" height="1"></img>
            </form>
        </div>
    );
}