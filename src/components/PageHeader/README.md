#有用的一个组件 简单高效

```

<div className={wrapperClassName}>
        {top}
        <PageHeader {...restProps} />
        {children ? <div className={content}>{children}</div> : null}
</div>

```