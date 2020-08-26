import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/wordcloud` if it exists or... Remove this comment to see the full error message
import WordCloud from 'wordcloud'
import saveFile from '../../utils/fileSaver'
import { ListControlCheck, Input } from 'mdui-in-react'

type WordsState = any;

class Words extends React.Component<{}, WordsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            text: "",
            sizes: "",
            edit: false,
            update: {
                open: false,
                i: 0
            }
        }
    }
    render() {
        const { text, sizes, edit, update } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'add' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        const { add, onUpdate, onDelete, words } = this.props;
        var applist = words.map((icon: any, i: any) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li
                key={i}
                mdui-dialog={edit ? null : "{target:'#icon',history:false}"}
                className="mdui-list-item mdui-ripple"
                onClick={() => {
                    update.open = true;
                    update.i = i;
                    this.setState({
                        text: icon[0],
                        sizes: icon[1],
                        edit: edit,
                        update: update
                    })
                }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <i className="mdui-list-item-icon mdui-icon material-icons">font_download</i>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-list-item-content">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-list-item-title mdui-list-item-one-line">{icon[0]}</div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-list-item-text mdui-list-item-one-line">{(icon[1] === "") ? "随机" : icon[1]}</div>
                </div>
                {edit &&
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <button onClick={() => onDelete(i)} className="mdui-btn mdui-btn-icon">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <i className="mdui-icon material-icons mdui-text-color-red">delete</i>
                    </button>}
            </li>
        ))
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <li className="mdui-subheader">
                    文字&nbsp;&nbsp;
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span mdui-dialog="{target:'#icon',history:false}" className="mdui-text-color-theme">添加</span>
                    &nbsp;&nbsp;
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span
                        onClick={() => {
                            this.setState({ edit: !edit })
                        }}
                        className="mdui-text-color-theme">
                        {!edit ? '编辑' : '确定'}
                    </span>
                </li>
                {applist}
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div style={{ display: 'inline-block' }} className="mdui-dialog" id="icon">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-dialog-content">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Input
                            onValueChange={newText => {
                                this.setState({ text: newText })
                            }}
                            header="文字"
                            placeholder=" "
                            value={text}
                        />
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Input
                            onValueChange={newText => {
                                this.setState({ sizes: newText })
                            }}
                            header="大小,留空为随机"
                            placeholder=" "
                            type="number"
                            value={sizes}
                        />
                    </div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-dialog-actions">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button
                            className="mdui-btn mdui-ripple" mdui-dialog-close="true">
                            取消
                        </button>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button
                            className="mdui-btn mdui-ripple" mdui-dialog-close="true"
                            onClick={() => {
                                if (update.open) {
                                    onUpdate(update.i, [text, sizes])
                                    update.open = false
                                    this.setState({ update: update })
                                } else {
                                    add([text, sizes])
                                }
                            }}
                        >
                            保存
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

const RandomNum = () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    var num = parseInt(Math.random() * (100 - 0 + 1) + 0, 10); //随机选取0到100之间的整数
    return num
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            words: [
                ['云极客工具', 20],
                ['乱世论', 20],
                ['御坂美琴', 20],
                ['自由', ''],
            ],
            NoRotate: false,
            transportBg: true
        }
        this.create = this.create.bind(this)
    }
    componentDidMount() {
        this.create()
    }
    create() {
        const { words, NoRotate, transportBg } = this.state
        var list = words.map((word: any) => [word[0], (word[1] === "") ? RandomNum() : word[1]])
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'default'... Remove this comment to see the full error message
        WordCloud(this.canvas, {
            list: list,
            minRotation: (NoRotate) ? 0 : RandomNum(),
            maxRotation: (NoRotate) ? 0 : RandomNum(),
            backgroundColor: (transportBg ? '#fff0' : '#ffffff')
        })
    }
    render() {
        const { words, NoRotate, transportBg } = this.state
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <canvas
                onClick={() => {
                    // @ts-expect-error ts-migrate(2345) FIXME: Property 'type' is missing in type '{ file: any; f... Remove this comment to see the full error message
                    saveFile({
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'default'... Remove this comment to see the full error message
                        file: this.canvas.toDataURL('jpg'),
                        filename: "ygktool-word_cloud.jpg"
                    })
                }}
                style={{ width: '100%', border: '2px solid #888888' }}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'canvas' does not exist on type 'default'... Remove this comment to see the full error message
                ref={c => { this.canvas = c; }}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <span className="mdui-typo-caption-opacity mdui-text-center">点击图片即可保存</span>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-tab" mdui-tab="true">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <a href="#text" className="mdui-ripple">文字</a>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <a href="#option" className="mdui-ripple">高级</a>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div id="text">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ul className="mdui-list">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Words
                        // @ts-expect-error ts-migrate(2322) FIXME: Property 'words' does not exist on type 'Intrinsic... Remove this comment to see the full error message
                        words={words}
                        add={(newIcon: any) => {
                            words.push(newIcon);
                            this.setState({
                                words: words
                            })
                        }}
                        onDelete={(i: any) => {
                            words.splice(i, 1);
                            this.setState({
                                words: words
                            })
                        }}
                        onUpdate={(i: any, info: any) => {
                            words.splice(i, 1, info);
                            this.setState({
                                words: words
                            })
                        }}
                    />
                </ul>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div id="option">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ListControlCheck
                    icon="keyboard_return"
                    title="禁止倾斜"
                    checked={NoRotate}
                    onCheckedChange={checked => {
                        this.setState({ NoRotate: checked })
                    }}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ListControlCheck
                    icon="crop_landscape"
                    title="透明背景"
                    checked={transportBg}
                    onCheckedChange={checked => {
                        this.setState({ transportBg: checked })
                    }}
                />
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <button
                onClick={this.create}
                className="mdui-ripple mdui-fab mdui-color-theme-accent mdui-fab-fixed">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <i className="mdui-icon material-icons">&#xe5ca;</i>
            </button>
        </>;
    }
}
