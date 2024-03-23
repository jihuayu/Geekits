import React, { useState, useEffect, useCallback, FC } from "react";
import AppMenu from "@/components/AppMenu";
import RightDrawer from "@/components/RightDrawer";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { getAppConfig, getAppDoc } from "@/utils/appData";
import appImportList from "@/utils/appEntry";
import getPaths from "@/utils/getPaths";
import { store as frameStore } from "@/utils/Data/frameState";

import type { GetStaticProps } from "next";
import { HelpOutlineTwoTone } from "@mui/icons-material";
import { useAction } from "@/contexts/action";

const drawerWidth: number = 260;

const PREFIX = "RDrawer";

const classes = {
	content: `${PREFIX}-content`,
	contentShift: `${PREFIX}-contentShift`,
};

const Root = styled("div")<{ freeSize?: boolean }>(
	({ theme }) =>
		({ freeSize }) => ({
			paddingX: `${freeSize ? "0" : theme.spacing(2)}`,
			margin: freeSize ? "unset" : "0 auto 24px auto",
			width: "100%",
			// maxWidth: freeSize ? "unset" : "1120px",
			[`& .${classes.content}`]: {
				position: "relative",
				// minHeight: "calc(100vh - 56px - 12px)",
				borderRadius: "24px",
				marginX: { sm: 4, xs: 0 },
				background: theme.palette.background.paper,
				padding: freeSize ? "0" : "30px",
				flexGrow: 1,
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				marginRight: 0,
			},

			[`& .${classes.contentShift}`]: {
				[theme.breakpoints.up("sm")]: {
					transition: theme.transitions.create("margin", {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),
					marginRight: drawerWidth,
				},
			},
		})
);

export async function getStaticPaths() {
	return {
		paths: ["zh-CN", "en-US"].map((locale) => getPaths(locale)).flat(1),
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = ({
	locale = "zh-CN",
	...ctx
}) => {
	const { id: currentId } = ctx.params;

	const appConfig = getAppConfig(currentId, ["name", "status", "freeSize"]);

	const appDoc = getAppDoc(currentId);

	const dic = require("../../data/i18n.json");

	return {
		props: {
			currentPage: {
				title: appConfig.name,
				description: appConfig.description || "",
				path: "/app/" + appConfig.id,
			},
			appConfig,
			locale,
			dic: JSON.stringify(dic[locale]),
			appDoc,
		},
	};
};

/**
 * Universal App Container
 */
const AppContainer = ({ appConfig, appDoc }) => {
	const [FeedbackComp, setFeedbackComp] = useState(null);
	const [showFeedbackComp, setShowFeedbackComp] = useState(false);
	const [RightDrawerOpen, setRightDrawerOpen] = useState(true);

	const { setAction } = useAction();

	const loadLink =
		appConfig.status === "stable" || appConfig.status === "beta"
			? appConfig.id
			: "__development";

	const AppComp = appImportList[loadLink] as FC;

	useEffect(() => {
		setAction(() => {
			const onClick = () => setRightDrawerOpen(!RightDrawerOpen);

			return (
				<IconButton
					aria-label="Switch drawer"
					onClick={onClick}
					edge="end"
					size="large"
					sx={
						{
							// mr: { sm: `${RightDrawerOpen ? drawerWidth + 10 : 0}px` },
						}
					}
				>
					<HelpOutlineTwoTone />
				</IconButton>
			);
		});

		if (window.location.search.indexOf("fullscreen=1") !== -1) {
			console.log("Detected Frame");
			frameStore.dispatch({ type: "frame/disabled" });
		}

		return () => {
			window.loadHide();
		};
	}, []);

	const feedback = useCallback(() => {
		if (!FeedbackComp) {
			// setFeedbackComp(
			//   !FeedbackComp &&
			//   Loadable(() => import("@/components/FeedbackComp"))
			// );
		}
		setShowFeedbackComp(true);
	}, [FeedbackComp]);

	return (
		<Root freeSize={!!appConfig.freeSize}>
			<div
				className={`${classes.content} ${
					RightDrawerOpen ? classes.contentShift : ""
				}`}
			>
				{AppComp && <AppComp />}
			</div>
			<RightDrawer
				onClose={() => setRightDrawerOpen(!RightDrawerOpen)}
				open={RightDrawerOpen}
			>
				<AppMenu
					appDoc={appDoc}
					feedback={feedback}
					appConfig={appConfig}
				/>
			</RightDrawer>
			{/* {FeedbackComp && (
        <FeedbackComp
          open={showFeedbackComp}
          onClose={() => setShowFeedbackComp(false)}
        />
      )} */}
		</Root>
	);
};

export default AppContainer;
