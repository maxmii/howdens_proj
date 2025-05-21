import pandas as pd


def getExcelData(user=None):
    df = pd.read_excel(
        "HowdenTest.xlsx", sheet_name=["ActiveQueue", "WorkflowDefinition"]
    )

    active_queue = df["ActiveQueue"]
    active_queue.columns = active_queue.columns.str.strip()

    workflow_def = (
        df["WorkflowDefinition"]
        .loc[:, ["WorkflowTypeID", "WorkflowType"]]
        .drop_duplicates("WorkflowTypeID")
    )

    active_queue[["StartTime", "EndTime"]] = active_queue[
        ["StartTime", "EndTime"]
    ].apply(pd.to_datetime, errors="coerce")

    summary_df = pd.merge(
        active_queue,
        workflow_def,
        on="WorkflowTypeID",
        how="inner",
    )

    summary_df["Duration"] = (
        (summary_df["EndTime"] - summary_df["StartTime"])
        .dt.total_seconds()
        .fillna(0)
        .astype(int)
    )

    summary_df = (
        summary_df[
            [
                "Name",
                "SubmittedBy",
                "StartTime",
                "Status",
                "StatusMessage",
                "Duration",
                "WorkflowType",
                "OutputResult",
                "errorMessage",
            ]
        ]
        .copy()
        .rename(
            columns={
                "SubmittedBy": "User",
                "StatusMessage": "Progress",
                "OutputResult": "Result",
                "errorMessage": "Error",
            }
        )
    )
    summary_df = summary_df.where(pd.notnull(summary_df), None)

    if user is not None:
        summary_df = summary_df[summary_df["User"] == user]

    return summary_df.to_dict(orient="records")
