<?php
require_once ("common/header.php");
?>
<body class="fixed-header fixed-ribbon smart-style-4 en desktop-detected mobile-view-activated ember-application modal-open">
<div id="back-top" class="hidden">
    <button type="button" class="btn btn-circle bg-color-blueDark txt-color-white" title="Back to top">
        <i class="fa fa-gear fa-arrow-up"></i>
    </button>
</div>
<div id="fixed-notification-container">
</div>

<div id="divSmallBoxes"></div>
<div id="divMiniIcons"></div>
<div id="divbigBoxes"></div>
<div id="main-nav" class="ember-view">
    <div id="profile-nav">
        <div class="dropdown nav-select"><a href="javascript:void(0);" class="nav-item" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-user"></i><div id="profile-image" style="background-image: none;"></div><div style="    position: absolute;    position: absolute;    bottom: -2.5px;    right: -3px;    width: 15px;    height: 15px;    background: #666;    border-radius: 50%;"></div><div id="account-status" class="status-online" data-bindattr-654="654"></div></a>
            <ul id="account-menu-container" class="dropdown-menu multi-level text-left" role="menu" style="min-width : 250px; margin-top : 13px;">
                <li><a tabindex="-1" href="javascript:void(0);" class="navigate-view" id="account-select">My Profile</a></li>
                <li class="dropdown-submenu" id="status-select"><a href="javascript:void(0);"><span class="status-online" data-bindattr-655="655"></span>&nbsp;<span style="display: inline-block; vertical-align: middle">Online</span></a>
                    <ul class="dropdown-menu">
                        <li><a tabindex="-1" href="javascript:void(0);" class="status-select" id="online"><span class="status-online"></span>&nbsp;<span style="display: inline-block; vertical-align: middle">Online</span></a></li>
                        <li><a href="javascript:void(0);" class="status-select" id="away"><span class="status-away"></span>&nbsp;<span style="display: inline-block; vertical-align: middle">Away</span></a></li>
                        <li><a href="javascript:void(0);" class="status-select" id="invisible"><span class="status-invisible"></span>&nbsp;<span style="display: inline-block; vertical-align: middle">Invisible</span></a></li>
                    </ul>
                </li>
                <li class="dropdown-submenu" id="property-status-toggle"><a href="javascript:void(0);">Accept chats from</a>
                    <ul class="dropdown-menu" style="min-width : 420px; max-height : 300px; overflow: auto;">
                        <li class="dropdown-header">Sites</li>
                        <li>
                            <div class="smart-form" style="padding : 5px 20px;">
                                <label class="toggle" style="font-size : inherit">
                                    <input type="checkbox" name="checkbox-toggle" checked="checked" data-property-id="5a67ac584b401e45400c5653" data-bindattr-4958="4958"><i data-swchon-text="Yes" data-swchoff-text="No"></i>Pickering Toyota Live Video Chat</label>
                            </div>
                        </li>
                        <li>
                            <div class="smart-form" style="padding : 5px 20px;">
                                <label class="toggle" style="font-size : inherit">
                                    <input type="checkbox" name="checkbox-toggle" checked="checked" data-property-id="5a55196ed7591465c7069586" data-bindattr-4960="4960"><i data-swchon-text="Yes" data-swchoff-text="No"></i>Uniqks</label>
                            </div>
                        </li>
                        <li class="divider"></li>
                        <li class="dropdown-header">tawk.to Pages</li>
                        <li>
                            <div class="smart-form" style="padding : 5px 20px;">
                                <label class="toggle" style="font-size : inherit">
                                    <input type="checkbox" name="checkbox-toggle" checked="checked" data-property-id="5a60123e3098e70e78bf9fad" data-bindattr-4962="4962"><i data-swchon-text="Yes" data-swchoff-text="No"></i>frank</label>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="divider"></li>
                <li class="presentation" id="desktop-notification-container">
                    <div class="smart-form" style="padding : 5px 20px;">
                        <section style="margin-bottom : 0;">
                            <label class="toggle" style="font-size : inherit">
                                <input type="checkbox" name="checkbox-toggle" class="desktop-notification-switch"><i data-swchon-text="ON" data-swchoff-text="OFF"></i>Desktop notifications</label>
                        </section>
                    </div>
                </li>
                <li class="presentation" id="sound-notification-container">
                    <div class="smart-form" style="padding : 5px 20px;">
                        <section style="margin-bottom : 0;">
                            <label class="toggle" style="font-size : inherit">
                                <input type="checkbox" name="checkbox-toggle" class="sound-notification-switch" checked="checked"><i data-swchon-text="ON" data-swchoff-text="OFF"></i>Sound notifications</label>
                        </section>
                    </div>
                </li>
                <li class="presentation"><a href="javascript:void(0);" class="manage-sounds">Manage Sounds</a></li>
                <li class="divider"></li>
                <li class="presentation"><a href="javascript:void(0);" class="manage-sessions">Browser &amp; App Sessions</a></li>
                <li class="divider"></li>
                <li class="presentation"><a href="javascript:void(0);" class="support-popout"><i class="fa fa-support"></i>&nbsp;Need Help? Let's chat</a></li>
                <li class="presentation"><a href="https://www.tawk.to/knowledgebase/" target="_blank"><i class="fa fa-book"></i>&nbsp;Knowledgebase</a></li>
                <li class="dropdown-submenu dropup">
                    <a tabindex="-1" href="javascript:void(0);"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-en" data-bindattr-677="677" alt="english" data-bindattr-678="678"><span>&nbsp;english&nbsp;</span></a>
                    <ul id="dashboard-lang-selection" class="dropdown-menu">
                        <li>
                            <a href="javascript:void(0);" id="bg" data-bindattr-680="680" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-bg" data-bindattr-681="681" alt="български" data-bindattr-682="682">&nbsp;български</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="cat" data-bindattr-684="684" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-cat" data-bindattr-685="685" alt="català" data-bindattr-686="686">&nbsp;català</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="cs" data-bindattr-688="688" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-cs" data-bindattr-689="689" alt="čeština" data-bindattr-690="690">&nbsp;čeština</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="de" data-bindattr-692="692" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-de" data-bindattr-693="693" alt="Deutsch" data-bindattr-694="694">&nbsp;Deutsch</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="en" data-bindattr-696="696" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-en" data-bindattr-697="697" alt="english" data-bindattr-698="698">&nbsp;english</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="es" data-bindattr-700="700" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-es" data-bindattr-701="701" alt="español" data-bindattr-702="702">&nbsp;español</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="fr" data-bindattr-704="704" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-fr" data-bindattr-705="705" alt="français" data-bindattr-706="706">&nbsp;français</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="hi" data-bindattr-708="708" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-hi" data-bindattr-709="709" alt="हिंदी" data-bindattr-710="710">&nbsp;हिंदी</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="it" data-bindattr-712="712" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-it" data-bindattr-713="713" alt="italiano" data-bindattr-714="714">&nbsp;italiano</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="hu" data-bindattr-716="716" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-hu" data-bindattr-717="717" alt="magyar" data-bindattr-718="718">&nbsp;magyar</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="ko" data-bindattr-720="720" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-ko" data-bindattr-721="721" alt="한국어" data-bindattr-722="722">&nbsp;한국어</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="nl" data-bindattr-724="724" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-nl" data-bindattr-725="725" alt="Nederlands" data-bindattr-726="726">&nbsp;Nederlands</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="pl" data-bindattr-728="728" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-pl" data-bindattr-729="729" alt="polski" data-bindattr-730="730">&nbsp;polski</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="pt_br" data-bindattr-732="732" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-pt_br" data-bindattr-733="733" alt="português (Brasil)" data-bindattr-734="734">&nbsp;português (Brasil)</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="ro" data-bindattr-736="736" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-ro" data-bindattr-737="737" alt="română" data-bindattr-738="738">&nbsp;română</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="ru" data-bindattr-740="740" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-ru" data-bindattr-741="741" alt="Русский" data-bindattr-742="742">&nbsp;Русский</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="sk" data-bindattr-744="744" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-sk" data-bindattr-745="745" alt="slovenčina" data-bindattr-746="746">&nbsp;slovenčina</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="sv" data-bindattr-748="748" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-sv_se" data-bindattr-749="749" alt="svenska" data-bindattr-750="750">&nbsp;svenska</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="tr" data-bindattr-752="752" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-tr" data-bindattr-753="753" alt="Türkçe" data-bindattr-754="754">&nbsp;Türkçe</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="vi" data-bindattr-756="756" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-vi" data-bindattr-757="757" alt="Tiếng Việt" data-bindattr-758="758">&nbsp;Tiếng Việt</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="zh_tw" data-bindattr-760="760" class="change-language"><img src="https://static-a.tawk.to/v2/a34/images/blank.gif" class="flag flag-zh_tw" data-bindattr-761="761" alt="中文" data-bindattr-762="762">&nbsp;中文</a>
                        </li>
                    </ul>
                </li>
                <li class="divider"></li>
                <li><a href="https://dashboard.tawk.to/logout" data-bindattr-668="668"><i class="fa fa-power-off"></i>&nbsp;Logout</a></li>
                <div class="block"></div>
            </ul>
        </div>
    </div>
    <div id="other-nav">
        <ul id="nav-list">
            <li class="navigate-view menu-tooltip nav-select active" id="dashboard-select" data-placement="right" data-original-title="Dashboard" style="margin-top: 11px;"><a href="javascript: void(0);" class="nav-item"><i class="fa fa-dashboard"></i></a></li>
            <li class="navigate-view menu-tooltip nav-select" id="monitoring-select" data-placement="right" data-original-title="Monitoring"><a href="javascript: void(0);" class="nav-item"><span class="fa-stack fa-lg" style="font-size: 27px;width: 27px;height: 27px;line-height: 27px;"><i class="fa fa-desktop fa-stack-2x" style="font-size: 27px;left: -1px;"></i><i class="fa fa-line-chart fa-stack-1x" style="font-size: 19px;left: -3px;bottom: 3px;"></i></span></a><span class="badge">0</span></li>
            <li class="navigate-view menu-tooltip nav-select" id="chat-select" data-placement="right" data-original-title="Active Chats"><a href="javascript: void(0);" class="nav-item"><i class="fa fa-comments"></i></a></li>
            <li class="navigate-view menu-tooltip nav-select" id="messaging-select" data-placement="right" data-original-title="Messaging"><a href="javascript: void(0);" class="nav-item"><i class="fa fa-inbox"></i></a><span class="badge">15</span></li>
            <li class="navigate-view menu-tooltip nav-select" id="reporting-select" data-placement="right" data-original-title="Reporting"><a href="javascript: void(0);" class="nav-item"><i class="fa fa-bar-chart"></i></a></li>
            <li class="navigate-view menu-tooltip nav-select" id="addon-select" data-placement="right" data-original-title="Add-ons"><a href="javascript: void(0);" class="nav-item"><i class="fa fa-puzzle-piece" style="margin-left: 4px; padding-top: 6px;"></i></a></li>
            <li class="navigate-view menu-tooltip nav-select" id="admin-select" data-placement="right" data-original-title="Admin"><a href="javascript: void(0);" class="nav-item"><i class="fa fa-gear"></i></a></li>
        </ul>
    </div>
</div>
<aside id="left-panel" class="ember-view">
    <div id="unseen-top" class="hidden"><span class="text">Unseen</span>&nbsp;<i class="fa fa-arrow-up"></i></div>
    <nav id="visitors">
        <div id="visitorsScrollContainer">
            <div class="list-section hidden" data-bindattr-765="765" style="border-bottom: 1px solid rgb(26, 24, 23) !important;">
                <div id="icr-title" class="sidebar-title" style="padding-right :5px;">
                    <p style="float: left; width: 100%; display: block; margin : 0;"><span class="active-chats full-name">Incoming</span></p><span style="color : #bbc0cf; border : 1px solid #bbc0cf; border-radius : 3px; display: inline-block; width: 24px; text-align: center; font-weight : bold; float: right;margin-left : -100%;">0</span>
                    <div class="clearfix"></div>
                </div>
                <div style="padding: 10px 5px; text-align : center;">
                    <div class="active-chats">
                        <p style="color : #fff; text-transform : none;">0 pending chat requests</p>
                    </div>
                </div>
            </div>
            <div class="list-section">
                <ul id="activeVisitors" class="hidden" data-bindattr-767="767"></ul>
                <ul id="myChatsList" class="" data-bindattr-768="768"></ul>
            </div>
            <div id="channelList" class="list-section nonVisitorsList">
                <div class="sidebar-title">
                    <div class="active-chats-long">
                        <div class="sidebar-search-container">
                            <div style="margin-right: 40px;position: relative;"><i class="icon-append fa fa-search"></i>
                                <a href="javascript:void(0);" class="hidden clear-group-search clear-search"> <i class="fa fa-close"></i></a>
                                <input type="text" class="search-input" id="search-group" placeholder="Groups (0)" data-bindattr-769="769">
                            </div>
                        </div><a id="toggle-inline-group-chat" href="javascript:void(0);" class="dropdown-toggle add-tooltip toggle-agent-chat-view" data-bindattr-770="770" data-toggle="dropdown" data-original-title="Open group chats inline" data-bindattr-771="771" data-placement="bottom" aria-haspopup="true" aria-expanded="false"><span class="fa fa-window-restore" style="font-size: 13px;"></span></a><a id="new-group" href="javascript:void(0);" class="add-tooltip new-group" data-original-title="New Group" data-placement="bottom"><span class="fa-stack"><i class="fa fa-circle-o fa-stack-2x"></i><i class="fa fa-plus fa-stack-1x"></i></span></a>
                        <div class="clearfix"></div>
                    </div>
                    <div class="active-chats-short"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" style="color : inherit;"><i class="fa fa-lg fa-fw fa-group"></i></a>
                        <ul class="dropdown-menu" style="position: fixed; width : 300px; left : 80px;">
                            <li><a href="javascript:void(0);" class="new-group"><i class="fa fa-plus"></i> Create new group</a></li>
                            <li><a href="javascript:void(0);" class="open-group-list"><i class="fa fa-group"></i>  Browse all groups</a></li>
                            <li class="divider"></li>
                            <li class="smart-form" style="padding: 10px 11px;">
                                <label class="checkbox">
                                    <input type="checkbox" id="group-chat-view" name="checkbox-toggle" data-bindattr-772="772"><i></i>Show group chats inline</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul id="channels" class="chat-users">
                    <li>
                        <div class="display-users" style="overflow: auto;"></div>
                    </li>
                </ul>
            </div>
            <div id="agentList" class="list-section nonVisitorsList">
                <div class="sidebar-title">
                    <div class="active-chats-long">
                        <div class="sidebar-search-container">
                            <div style="margin-right: 22px;position: relative;"><i class="icon-append fa fa-search"></i>
                                <a href="javascript:void(0);" class="hidden clear-dm-search clear-search"> <i class="fa fa-close"></i></a>
                                <input type="text" id="search-dm" class="search-input" placeholder="Direct Messages (4)" data-bindattr-773="773">
                            </div>
                        </div><a id="toggle-inline-dm-chat" href="javascript:void(0);" class="dropdown-toggle add-tooltip toggle-agent-chat-view" data-bindattr-774="774" data-toggle="dropdown" data-original-title="Open direct messages inline" data-bindattr-775="775" data-placement="bottom" aria-haspopup="true" aria-expanded="false"><span class="fa fa-window-restore" style="font-size: 13px;"></span></a>
                        <div class="clearfix"></div>
                    </div>
                    <div class="active-chats-short"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" style="color : inherit;"><i class="fa fa-lg fa-fw fa-comment-o"></i></a>
                        <ul class="dropdown-menu" style="position: fixed; width : 300px; left : 80px;">
                            <li><a href="javascript:void(0);" class="open-dm-list"><i class="fa fa-comment-o"></i> Browse all direct messages</a></li>
                            <li class="divider"></li>
                            <li class="smart-form" style="padding: 10px 11px;">
                                <label class="checkbox">
                                    <input type="checkbox" id="dm-chat-view" name="checkbox-toggle" data-bindattr-776="776"><i></i>Show direct messages inline</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul id="agents" class="chat-users">
                    <li>
                        <div class="display-users"></div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div id="unseen-bottom" class="hidden"><span class="text">Unseen</span>&nbsp;<i class="fa fa-arrow-down"></i></div><span class="minifyme" data-action="minifyMenu" style="position: absolute; bottom : 10px;"><i class="fa fa-arrow-circle-left hit"></i></span></aside>
<div id="main" class="ember-view">
    <div id="ember372" class="ember-view dynamic-view" style="display: block;">
        <div id="dashboard" class="ember-view">
            <div class="content">
                <div class="row view-header">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <h1 class="page-title txt-color-blueDark"><i class="fa fa-dashboard"></i> Dashboard</h1></div>
                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <ul id="sparks">
                            <li id="ember4967" class="ember-view sparks-info">
                                <h5 data-placement="bottom" data-original-title="Visitors Today" data-bindattr-4970="4970">Visitors&nbsp;<span class="txt-color-tawk-dark-blue" data-bindattr-4972="4972"><i class="fa fa-user" data-bindattr-4974="4974"></i>&nbsp;14</span></h5>
                                <div class="sparkline">
                                    <canvas width="47" height="26" style="display: inline-block; width: 47px; height: 26px; vertical-align: top;"></canvas>
                                </div>
                            </li>
                            <li id="ember4968" class="ember-view sparks-info">
                                <h5 data-placement="bottom" data-original-title="Visits Today" data-bindattr-4975="4975">Visits&nbsp;<span class="txt-color-tawk-green" data-bindattr-4977="4977"><i class="fa fa-exchange" data-bindattr-4979="4979"></i>&nbsp;15</span></h5>
                                <div class="sparkline">
                                    <canvas width="47" height="26" style="display: inline-block; width: 47px; height: 26px; vertical-align: top;"></canvas>
                                </div>
                            </li>
                            <li id="ember4969" class="ember-view sparks-info">
                                <h5 data-placement="bottom" data-original-title="Chats Today" data-bindattr-4980="4980">Chats&nbsp;<span class="txt-color-tawk-pink" data-bindattr-4982="4982"><i class="fa fa-comments" data-bindattr-4984="4984"></i>&nbsp;2</span></h5>
                                <div class="sparkline">
                                    <canvas width="47" height="26" style="display: inline-block; width: 47px; height: 26px; vertical-align: top;"></canvas>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="innerContent">
                    <div id="analytics-section" class="ember-view">
                        <section id="widget-analytics" class="col-sm-12">
                            <article>
                                <div class="jarviswidget" id="wid-id-0" data-widget-togglebutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="false" data-widget-colorbutton="false" data-widget-deletebutton="false">
                                    <header><span class="widget-icon"> <i class="glyphicon glyphicon-stats txt-color-darken"></i> </span>
                                        <h2>Analytics</h2>
                                        <ul class="nav nav-tabs pull-right in">
                                            <li role="presentation" class="active"><a data-toggle="tab" role="tab" href="#latest"><i class="fa fa-dashboard"></i>&nbsp;<span class="hidden-mobile hidden-tablet">Latest</span></a></li>
                                            <li role="presentation"><a data-toggle="tab" role="tab" href="#historical"><i class="fa fa-calendar"></i>&nbsp;<span class="hidden-mobile hidden-tablet">Historical</span></a></li>
                                        </ul>
                                    </header>
                                    <div class="no-padding" role="content">
                                        <div class="widget-body">
                                            <div id="analyticsTabContent" class="tab-content">
                                                <div id="latest" class="ember-view tab-pane fade active in padding-10 no-padding-bottom">
                                                    <div class="" data-bindattr-4985="4985">
                                                        <div class="row no-space">
                                                            <div id="live-graph-container" class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                                                <h4 class="text-center">Live Visitors</h4>
                                                                <div class="yaxisLabel">
                                                                    <div style="padding : 0 5px;">Visitors count</div>
                                                                </div>
                                                                <div id="live-graph" class="chart-large txt-color-blue" style="width: 100%; height: 235px; padding: 0px; position: relative;">
                                                                    <canvas class="flot-base" width="537" height="235" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 537px; height: 235px;"></canvas>
                                                                    <div class="flot-text" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; font-size: smaller; color: rgb(84, 84, 84);">
                                                                        <div class="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; display: block;">
                                                                            <div class="flot-tick-label tickLabel" style="position: absolute; top: 215px; left: 10px; text-align: right;">0</div>
                                                                            <div class="flot-tick-label tickLabel" style="position: absolute; top: 174px; left: 10px; text-align: right;">2</div>
                                                                            <div class="flot-tick-label tickLabel" style="position: absolute; top: 133px; left: 10px; text-align: right;">4</div>
                                                                            <div class="flot-tick-label tickLabel" style="position: absolute; top: 92px; left: 10px; text-align: right;">6</div>
                                                                            <div class="flot-tick-label tickLabel" style="position: absolute; top: 51px; left: 10px; text-align: right;">8</div>
                                                                            <div class="flot-tick-label tickLabel" style="position: absolute; top: 10px; left: 10px; text-align: right;">10</div>
                                                                        </div>
                                                                    </div>
                                                                    <canvas class="flot-overlay" width="537" height="235" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 537px; height: 235px;"></canvas>
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 show-stats">
                                                                <div class="row">
                                                                    <div id="ember4986" class="ember-view col-xs-6 col-sm-6 col-md-12 col-lg-12"><span class="text">Missed Chats<span class="pull-right">0/2</span></span>
                                                                        <div class="progress">
                                                                            <div class="progress-bar bg-color-red" style="width: 0%" data-bindattr-4998="4998"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="ember4987" class="ember-view col-xs-6 col-sm-6 col-md-12 col-lg-12"><span class="text">Positive Sentiment<span class="pull-right">0%</span></span>
                                                                        <div class="progress">
                                                                            <div class="progress-bar bg-color-blue" style="width: 0%" data-bindattr-5002="5002"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="ember4988" class="ember-view col-xs-6 col-sm-6 col-md-12 col-lg-12"><span class="text">Return Visitors<span class="pull-right">21%</span></span>
                                                                        <div class="progress">
                                                                            <div class="progress-bar bg-color-blue" style="width: 21%" data-bindattr-5005="5005"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="ember4989" class="ember-view col-xs-6 col-sm-6 col-md-12 col-lg-12"><span class="text">Engagement<span class="pull-right">13%</span></span>
                                                                        <div class="progress">
                                                                            <div class="progress-bar bg-color-blue" style="width: 13%" data-bindattr-5008="5008"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="ember4990" class="ember-view col-xs-6 col-sm-6 col-md-12 col-lg-12"><span class="text">Availability<span class="pull-right">82%</span></span>
                                                                        <div class="progress">
                                                                            <div class="progress-bar bg-color-blue" style="width: 82%" data-bindattr-5011="5011"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="show-stat-microcharts">
                                                            <div id="ember4991" class="ember-view col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                <div class="microcharts-container">
                                                                    <div class="pie-chart-container">
                                                                        <div class="easy-pie-chart" data-percent="-3" data-bindattr-5013="5013" data-original-title="Daily average visitors VS last 24 hours visitors" data-bindattr-5014="5014"><span class="percent percent-sign">-3</span>
                                                                            <canvas height="50" width="50"></canvas>
                                                                        </div>
                                                                    </div>
                                                                    <div class="microchart-sparkline-container">
                                                                        <div class="sparkline">
                                                                            <canvas width="70" height="33" style="display: inline-block; width: 70px; height: 33px; vertical-align: top;"></canvas>
                                                                        </div>
                                                                        <ul class="smaller-stat">
                                                                            <li><span class="label bg-color-greenLight text-center" data-placement="bottom" data-original-title="Highest visitor count per day in last 7 days" data-bindattr-5016="5016"><i class="fa fa-caret-up"></i>25</span></li>
                                                                            <li><span class="label bg-color-blueLight text-center" data-placement="bottom" data-original-title="Lowest visitor count per day in last 7 days" data-bindattr-5018="5018"><i class="fa fa-caret-down"></i>5</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <p class="easy-pie-title text-center">Visitors</p>
                                                            </div>
                                                            <div id="ember4992" class="ember-view col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                <div class="microcharts-container">
                                                                    <div class="pie-chart-container">
                                                                        <div class="easy-pie-chart" data-percent="-3" data-bindattr-5021="5021" data-original-title="Daily average visits VS last 24 hours visits" data-bindattr-5022="5022"><span class="percent percent-sign">-3</span>
                                                                            <canvas height="50" width="50"></canvas>
                                                                        </div>
                                                                    </div>
                                                                    <div class="microchart-sparkline-container">
                                                                        <div class="sparkline">
                                                                            <canvas width="70" height="33" style="display: inline-block; width: 70px; height: 33px; vertical-align: top;"></canvas>
                                                                        </div>
                                                                        <ul class="smaller-stat">
                                                                            <li><span class="label bg-color-greenLight text-center" data-placement="bottom" data-original-title="Highest visit per day in last 7 days" data-bindattr-5024="5024"><i class="fa fa-caret-up"></i>26</span></li>
                                                                            <li><span class="label bg-color-blueLight text-center" data-placement="bottom" data-original-title="Lowest visit per day in last 7 days" data-bindattr-5026="5026"><i class="fa fa-caret-down"></i>5</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <p class="easy-pie-title text-center">Visits</p>
                                                            </div>
                                                            <div id="ember4993" class="ember-view col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                <div class="microcharts-container">
                                                                    <div class="pie-chart-container">
                                                                        <div class="easy-pie-chart" data-percent="-2" data-bindattr-5029="5029" data-original-title="Daily average page views VS last 24 hours page views" data-bindattr-5030="5030"><span class="percent percent-sign">-2</span>
                                                                            <canvas height="50" width="50"></canvas>
                                                                        </div>
                                                                    </div>
                                                                    <div class="microchart-sparkline-container">
                                                                        <div class="sparkline">
                                                                            <canvas width="70" height="33" style="display: inline-block; width: 70px; height: 33px; vertical-align: top;"></canvas>
                                                                        </div>
                                                                        <ul class="smaller-stat">
                                                                            <li><span class="label bg-color-greenLight text-center" data-placement="bottom" data-original-title="Highest page views per day in last 7 days" data-bindattr-5032="5032"><i class="fa fa-caret-up"></i>28</span></li>
                                                                            <li><span class="label bg-color-blueLight text-center" data-placement="bottom" data-original-title="Lowest page views per day in last 7 days" data-bindattr-5034="5034"><i class="fa fa-caret-down"></i>5</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <p class="easy-pie-title text-center">Page Views</p>
                                                            </div>
                                                            <div id="ember4994" class="ember-view col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                <div class="microcharts-container">
                                                                    <div class="pie-chart-container">
                                                                        <div class="easy-pie-chart" data-percent="100" data-bindattr-5037="5037" data-original-title="Daily average chats VS last 24 hours chats" data-bindattr-5038="5038"><span class="percent percent-sign">100</span>
                                                                            <canvas height="50" width="50"></canvas>
                                                                        </div>
                                                                    </div>
                                                                    <div class="microchart-sparkline-container">
                                                                        <div class="sparkline">
                                                                            <canvas width="70" height="33" style="display: inline-block; width: 70px; height: 33px; vertical-align: top;"></canvas>
                                                                        </div>
                                                                        <ul class="smaller-stat">
                                                                            <li><span class="label bg-color-greenLight text-center" data-placement="bottom" data-original-title="Highest chats per day in last 7 days" data-bindattr-5040="5040"><i class="fa fa-caret-up"></i>3</span></li>
                                                                            <li><span class="label bg-color-blueLight text-center" data-placement="bottom" data-original-title="Lowest chats per day in last 7 days" data-bindattr-5042="5042"><i class="fa fa-caret-down"></i>0</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <p class="easy-pie-title text-center">Chats</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="load-container text-center hidden" data-bindattr-4995="4995">
                                                        <button class="btn btn-danger reload-view">Error loading view. Click here to reload</button>
                                                    </div>
                                                    <div class="load-container text-center hidden" data-bindattr-4996="4996"><img src="https://static-a.tawk.to/v2/a34/images/ajax-loader-big.gif"></div>
                                                </div>
                                                <div id="historical" class="ember-view tab-pane fade">
                                                    <div class="widget-body-toolbar bg-color-white" style="position: relative;">
                                                        <div class="btn-group pull-left" style="margin-right: 15px; position : static;">
                                                            <button class="btn dropdown-toggle btn-xs btn-primary" data-toggle="dropdown" aria-expanded="false" style="margin-top: 0px;">Mar 16th, 2018 - Mar 22nd, 2018 <i class="fa fa-caret-down"></i></button>
                                                            <div class="dropdown-menu smart-form" role="menu" style="position: absolute; top : 30px; left : 10px;" id="date-range-form">
                                                                <form>
                                                                    <fieldset>
                                                                        <section class="col col-6">
                                                                            <label class="input"> <i class="icon-append fa fa-calendar"></i>
                                                                                <input type="text" class="form-control input-sm hasDatepicker" id="historical-from" placeholder="Date From">
                                                                            </label>
                                                                        </section>
                                                                        <section class="col col-6">
                                                                            <label class="input"> <i class="icon-append fa fa-calendar"></i>
                                                                                <input type="text" class="form-control input-sm hasDatepicker" id="historical-to" placeholder="Date To">
                                                                            </label>
                                                                        </section>
                                                                    </fieldset>
                                                                </form>
                                                                <footer>
                                                                    <button type="submit" class="btn btn-primary" id="applyFilter">Apply</button>
                                                                    <button type="submit" class="btn btn-default" id="closeFilter">Close</button>
                                                                </footer>
                                                            </div>
                                                        </div>
                                                        <div class="smart-form pull-right">
                                                            <div id="legends" class="pull-left"></div>
                                                            <div class="inline-group pull-left">
                                                                <label for="gra-chats" class="checkbox">
                                                                    <input type="checkbox" class="graph-filters" name="gra-chats" id="gra-chats" data-segment="chats" checked="checked"><i></i>Chats</label>
                                                                <label for="gra-page-views" class="checkbox">
                                                                    <input type="checkbox" class="graph-filters" name="gra-page-views" id="gra-page-views" data-segment="pageViews" checked="checked"><i></i>Page Views</label>
                                                                <label for="gra-visits" class="checkbox">
                                                                    <input type="checkbox" class="graph-filters" name="gra-visits" id="gra-visits" data-segment="visits" checked="checked"><i></i>Visits</label>
                                                                <label for="gra-visitors" class="checkbox">
                                                                    <input type="checkbox" class="graph-filters" name="gra-visitors" id="gra-visitors" data-segment="visitors" checked="checked"><i></i>Visitors</label>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div id="historical-graph-container" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hidden">
                                                        <div id="historical-graph"></div>
                                                    </div>
                                                    <div class="load-container text-center reload-view hidden">
                                                        <button class="btn btn-danger reload-button">Error loading view. Click here to reload</button>
                                                    </div>
                                                    <div class="load-container text-center loading-view"><img src="https://static-a.tawk.to/v2/a34/images/ajax-loader-big.gif"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>
                    <section>
                        <div id="history-section" class="ember-view view-section">
                            <article class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                                <div class="jarviswidget" id="wid-id-1" data-widget-togglebutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="false" data-widget-colorbutton="false" data-widget-deletebutton="false">
                                    <header><span class="widget-icon"> <i class="fa fa-history"></i> </span>
                                        <h2>History</h2>
                                        <div class="widget-toolbar" role="menu">
                                            <div class="btn-group">
                                                <button class="btn dropdown-toggle btn-xs btn-default" data-toggle="dropdown" aria-expanded="false">Site / tawk.to Page&nbsp;:&nbsp;frank&nbsp;<i class="fa fa-caret-down"></i></button>
                                                <ul class="dropdown-menu pull-right" style="max-height : 200px; overflow: auto;">
                                                    <li id="5a60123e3098e70e78bf9fad" data-bindattr-5057="5057" class="change-history-list"><a href="javascript:void(0);">frank</a></li>
                                                    <li id="5a67ac584b401e45400c5653" data-bindattr-5059="5059" class="change-history-list"><a href="javascript:void(0);">Pickering Toyota Live Video Chat</a></li>
                                                    <li id="5a55196ed7591465c7069586" data-bindattr-5061="5061" class="change-history-list"><a href="javascript:void(0);">Uniqks</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </header>
                                    <div role="content">
                                        <table id="history-list" class="table table-striped table-bordered table-hover dataTable no-footer" width="100%" role="grid" aria-describedby="dt_basic_info" style="width: 100%;">
                                            <thead>
                                            <tr role="row">
                                                <th tabindex="0" aria-controls="dt_basic" class="text-center" style="width: 30%; max-width : 30%">Visitor</th>
                                                <th tabindex="0" aria-controls="dt_basic" class="text-center" style="width: 30%; max-width : 30%">Agent</th>
                                                <th tabindex="0" aria-controls="dt_basic" class="text-center" style="width: 15%; max-width : 15%">Time</th>
                                            </tr>
                                            </thead>
                                            <tbody class="test"></tbody>
                                            <tfoot class="hidden" data-bindattr-5046="5046">
                                            <tr>
                                                <td colspan="3"><a id="next-page" class="btn btn-default next pull-right disabled" data-bindattr-5047="5047" href="javascript:void(0);" data-placement="top" data-original-title="Older">Load More</a></td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                        <div class="alert alert-info text-center fade hidden" data-bindattr-5048="5048" id="new-history" style="position:absolute; top : 0; width: 100%">
                                            <button class="close" data-dismiss="alert">×</button><a id="retrieveHistory" href="javascript:void(0);" style="text-decoration:underline" title="Retrieve new history"><h4 class="alert-heading message">New Message : 0</h4></a></div>
                                        <div class="no-data" data-bindattr-5050="5050">
                                            <p class="no-history">No chat history</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div id="feeds-section" class="ember-view">
                            <article class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                                <div class="jarviswidget" id="wid-id-1" data-widget-togglebutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="false" data-widget-colorbutton="false" data-widget-deletebutton="false">
                                    <header><span class="widget-icon"> <i class="fa fa-rss-square"></i> </span>
                                        <h2>Blog Posts</h2></header>
                                    <div id="feed-content" role="content">
                                        <ul>
                                            <li><a href="https://www.tawk.to/events/meet-tawk-to-usa/" data-bindattr-5065="5065" target="_blank">Meet tawk.to &gt; USA</a></li>
                                            <li><a href="https://www.tawk.to/integrations/update-shopify-integration/" data-bindattr-5067="5067" target="_blank">Update : Shopify integration</a></li>
                                            <li><a href="https://www.tawk.to/events/meet-tawk-to-apac/" data-bindattr-5069="5069" target="_blank">Meet tawk.to &gt; APAC</a></li>
                                            <li><a href="https://www.tawk.to/customer-happiness/you-are-one-in-a-million/" data-bindattr-5071="5071" target="_blank">You are One in a Million</a></li>
                                            <li><a href="https://www.tawk.to/reference/9-things-you-probably-didnt-know-you-could-do-with-tawk-to/" data-bindattr-5073="5073" target="_blank">9 Things you probably didn’t know you could do with Tawk.to</a></li>
                                            <li><a href="https://www.tawk.to/customer-happiness/what-we-learned-in-the-first-180-days-of-the-hired-agents-beta/" data-bindattr-5075="5075" target="_blank">What we learned in the first 180 days of the “Hired Agents Beta”</a></li>
                                            <li><a href="https://www.tawk.to/events/meet-us-in-nyc-at-ase17-this-week/" data-bindattr-5077="5077" target="_blank">Meet us in NYC at #ASE17 this week</a></li>
                                            <li><a href="https://www.tawk.to/updates/new-ios-android-mobile-apps/" data-bindattr-5079="5079" target="_blank">New iOS &amp; Android Mobile Apps</a></li>
                                            <li><a href="https://www.tawk.to/customer-happiness/what-we-learned-in-the-first-90-days-of-the-hired-agents-beta/" data-bindattr-5081="5081" target="_blank">What we learned in the first 90 days of the “Hired Agents Beta”</a></li>
                                            <li><a href="https://www.tawk.to/updates/update-mail-notifications/" data-bindattr-5083="5083" target="_blank">Update : Mail Notifications</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <div id="visitor-chat-view" class="ember-view" style="visibility: hidden;">
        <div class="content">
            <div class="row view-header">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <h1 class="page-title txt-color-blueDark"><i class="fa-fw fa fa-comments"></i><p id="view-title">Chats</p></h1></div>
                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <div style="display: table;">
                        <div style="display: table-cell; width: 1%">
                            <div id="visitor-chat-action-container"><i id="button-details-toggle" class="fa fa-columns" data-bindattr-777="777" aria-hidden="true" data-original-title="Toggle ON All Chat Details" data-bindattr-778="778" data-placement="bottom"></i>
                                <div class="btn-group"><a id="prev-chat" class="btn btn-default btn-circle disabled prev" href="javascript:void(0);" data-placement="bottom" data-original-title="Previous"><i class="fa fa-chevron-left"></i></a><a id="next-chat" class="btn btn-default btn-circle disabled next" href="javascript:void(0);" data-placement="bottom" data-original-title="Next"><i class="fa fa-chevron-right"></i></a></div>
                                <div class="slider-container">
                                    <div id="slider" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                                        <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 100%;"></a>
                                    </div>
                                    <div class="tooltip fade bottom" style="top: 20px; left: 100%;">
                                        <div class="tooltip-arrow" style="left: 0%;"></div>
                                        <div class="tooltip-inner" style="width: 80px; margin-left: -40px;">View / 4</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="inner-content" class="innerContent col-1" data-bindattr-779="779">
                <div id="chat-scroller">
                    <div id="no-chat-message" class="well text-center" data-bindattr-780="780">
                        <div id="simulate-chat-text">
                            <h5> There are currently no chats from any of your <a href="javascript:void(0);" id="view-sites"> sites </a> or <a href="javascript:void(0);" id="view-pages"> tawk.to pages </a> . </h5>
                            <h5> Click <a href="javascript:void(0);" id="simulate-chat"> here </a> to simulate a visitor and initiate a chat to test the application. </h5></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="logo-group" class="ember-view">
    <div id="full-header-menu" style=""><a href="javascript:void(0);" id="group-icr" class="sidebar-visitors-action selected" data-bindattr-781="781" data-placement="bottom" data-original-title="Ungroup incoming chat requests"><i class="fa fa-object-group"></i></a><a href="javascript:void(0);" id="visitor-details-toggle" class="sidebar-visitors-action" data-bindattr-782="782" data-original-title="Enable visitor details hover" data-placement="bottom"><i class="fa fa-id-card-o"></i></a><a href="javascript:void(0);" id="list-view-toggle" class="sidebar-visitors-action" data-bindattr-783="783" data-original-title="Show all ongoing chats" data-placement="bottom"><i class="fa fa-filter"></i></a>
        <div id="invitation-notification-container"><span id="activity" class="activity-dropdown"><i class="fa fa-bell"></i><b class="badge"> 2 </b></span>
            <div class="ajax-dropdown">
                <div class="ajax-notifications custom-scroll">
                    <ul class="notification-body">
                        <li><span class="padding-10"><div><div class="new-label" style="position : relative; top : 4px; right : 0;"></div> Checkout the new <b>Video + Voice + Screensharing</b> Addon!</div><div style="margin: 6px 0;display: inline-block; width: 100px;"><img class="addon-preview-image" src="https://static-a.tawk.to/v2/a34/images/video-chat-logo.png"></div><div style="display: inline-block; width: 219px; vertical-align: middle;">Solve problems fast for your customers with Video Chat, Voice Calls and 2-way screen sharing.</div><span class="button-container text-right"><button class="btn btn-xs btn-primary margin-right-5 view-webrtc" data-bindattr-794="794">More Info</button><button class="btn btn-xs btn-danger margin-right-5 dismiss-webrtc" data-bindattr-795="795">Dismiss</button></span></span>
                        </li>
                        <li><span class="padding-10"><em class="badge padding-5 no-border-radius bg-color-blueLight txt-color-white pull-left margin-right-5"><i class="fa fa-user fa-fw fa-2x"></i></em><span><span>You have been invited to join Special Event by Mahan&nbsp;</span><span class="button-container text-right"><button class="btn btn-xs btn-primary margin-right-5 accept" data-invite-id="5a9eb48fd7591465c7084f44" data-bindattr-4965="4965">Accept</button><button class="btn btn-xs btn-danger margin-right-5 reject" data-invite-id="5a9eb48fd7591465c7084f44" data-bindattr-4966="4966">Reject</button></span></span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="minified-header-menu" class="dropdown"><a href="javascript:void(0);" data-toggle="dropdown"><i class="fa fa-navicon"></i></a>
        <ul class="dropdown-menu multi-level text-left" role="menu" style="min-width : 300px; margin-top : 13px; border-radius: 5px;">
            <li>
                <div class="smart-form" style="padding : 5px 20px;">
                    <label class="toggle" style="font-size : inherit">
                        <input type="checkbox" name="checkbox-group-icr" id="group-icr-min" checked="checked"><i data-swchon-text="Yes" data-swchoff-text="No"></i><span class="fa fa-object-group"></span> Group incoming chat requests</label>
                </div>
            </li>
            <li>
                <div class="smart-form" style="padding : 5px 20px;">
                    <label class="toggle" style="font-size : inherit">
                        <input type="checkbox" name="checkbox-visitor-details" id="visitor-details-toggle-min"><i data-swchon-text="Yes" data-swchoff-text="No"></i><span class="fa fa-id-card-o"></span> Show visitor details on hover</label>
                </div>
            </li>
            <li>
                <div class="smart-form" style="padding : 5px 20px;">
                    <label class="toggle" style="font-size : inherit">
                        <input type="checkbox" name="checkbox-all-chats" checked="checked" id="list-view-toggle-min"><i data-swchon-text="Yes" data-swchoff-text="No"></i><span class="fa fa-filter"></span> Show only my ongoing chats</label>
                </div>
            </li>
            <li class="divider"></li>
            <li class="dropdown-submenu"><a tabindex="-1" href="javascript:void(0);"><i class="fa fa-bell"></i> Notifications&nbsp;<span class="badge" style="background-color: #0091d9; color : #fff;">2</span></a>
                <ul class="notification-body dropdown-menu" style="min-width : 400px; max-height : 300px; overflow: auto;">
                    <li><span class="padding-10"><div><div class="new-label" style="position : relative; top : 4px; right : 0;"></div> Checkout the new <b>Video + Voice + Screensharing</b> Addon!</div><div style="margin: 6px 0;display: inline-block; width: 100px;"><img class="addon-preview-image" src="https://static-a.tawk.to/v2/a34/images/video-chat-logo.png"></div><div style="display: inline-block; width: 219px; vertical-align: middle;">Solve problems fast for your customers with Video Chat, Voice Calls and 2-way screen sharing.</div><div class="button-container text-right"><button class="btn btn-xs btn-primary margin-right-5 view-webrtc" data-bindattr-794="794">More Info</button><button class="btn btn-xs btn-danger margin-right-5 dismiss-webrtc" data-bindattr-795="795">Dismiss</button></div></span></li>
                    <li><span class="padding-10"><em class="badge padding-5 no-border-radius bg-color-blueLight txt-color-white pull-left margin-right-5"><i class="fa fa-user fa-fw fa-2x"></i></em><span><span>You have been invited to join Special Event by Mahan&nbsp;</span>
                        <div class="button-container text-right">
                            <button class="btn btn-xs btn-primary margin-right-5 accept" data-invite-id="5a9eb48fd7591465c7084f44" data-bindattr-4963="4963">Accept</button>
                            <button class="btn btn-xs btn-danger margin-right-5 reject" data-invite-id="5a9eb48fd7591465c7084f44" data-bindattr-4964="4964">Reject</button>
                        </div>
                        </span>
                        </span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
<div id="agent-chat-container" class="ember-view">
    <div id="hiddenChatListContainer" class="hidden" style="right: 0px;"><a id="openHiddenList" href="javascript:void(0);" class="btn btn-default" data-toggle="dropdown"><i class="fa fa-comments-o fa-lg"></i><span>0</span><i class="fa fa-caret-up"></i></a>
        <ul id="hiddenList" class="dropdown-menu" role="dropdown"></ul>
    </div>
</div>
<div id="ui-datepicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>
<script src="https://js.stripe.com/v2/"></script>
<iframe name="stripeXDM_default46262_provider" id="stripeXDM_default46262_provider" aria-hidden="true" src="https://js.stripe.com/v2/channel.html?stripe_xdm_e=https%3A%2F%2Fdashboard.tawk.to&amp;stripe_xdm_c=default46262&amp;stripe_xdm_p=1#__stripe_transport__" frameborder="0" style="position: absolute; top: -2000px; left: 0px;"></iframe>
<iframe src="https://js.stripe.com/v2/m/outer.html#referrer=https%3A%2F%2Fdashboard.tawk.to%2Flogin&amp;title=tawk.to%20%7C%20Administration%20%7C%20Pickering%20Toyota%20Live%20Video%20Chat%20%7C%20Add-ons&amp;url=https%3A%2F%2Fdashboard.tawk.to%2F%23%2Fadmin%2F5a67ac584b401e45400c5653%2Faddon-store&amp;muid=4bd1967b-ab40-4e4c-a6b5-fb4e260588e0&amp;sid=23ea2ab5-dc3c-4044-9b34-9fdba4ee187b&amp;preview=false&amp;" frameborder="0" allowtransparency="true" scrolling="no" tabindex="-1" aria-hidden="true" style="width: 1px !important; height: 1px !important; position: fixed !important; visibility: hidden !important; pointer-events: none !important;"></iframe>
<ul class="dropdown-menu textcomplete-dropdown" id="textcomplete-dropdown-2" style="display: none; left: 0px; position: absolute; z-index: 100;"></ul>
<ul class="dropdown-menu textcomplete-dropdown" id="textcomplete-dropdown-1" style="display: none; left: 0px; position: absolute; z-index: 100;"></ul>
</body>
</html>
