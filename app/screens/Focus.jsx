import { useContext, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";

const sessionOptions = [15, 25, 45];

const formatTime = (secondsLeft) => {
  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const createStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.surface,
    },
    content: {
      padding: 18,
      paddingBottom: 28,
      gap: 18,
    },
    hero: {
      borderRadius: 24,
      padding: 20,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 10,
    },
    eyebrow: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontWeight: "700",
      color: palette.textMuted,
    },
    title: {
      fontSize: 28,
      fontWeight: "900",
      color: palette.text,
    },
    description: {
      fontSize: 14,
      lineHeight: 22,
      color: palette.textMuted,
    },
    timerCard: {
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surfaceAlt,
      gap: 16,
      alignItems: "center",
    },
    timerLabel: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.3,
      color: palette.textMuted,
      fontWeight: "700",
    },
    timerValue: {
      fontSize: 56,
      fontWeight: "900",
      color: palette.text,
    },
    progressTrack: {
      width: "100%",
      height: 10,
      borderRadius: 999,
      backgroundColor: palette.surface,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: palette.border,
    },
    progressFill: {
      height: "100%",
      backgroundColor: palette.accent,
    },
    chips: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "center",
    },
    chip: {
      borderRadius: 999,
      borderWidth: 1,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    chipText: {
      fontSize: 13,
      fontWeight: "800",
    },
    controls: {
      flexDirection: "row",
      gap: 10,
      flexWrap: "wrap",
      justifyContent: "center",
    },
    controlButton: {
      minWidth: 110,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    controlText: {
      fontSize: 13,
      fontWeight: "800",
      color: "#ffffff",
    },
    tipsCard: {
      borderRadius: 20,
      padding: 18,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surfaceAlt,
      gap: 8,
    },
    tipsTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: palette.text,
    },
    tipText: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
  });

export default function Focus() {
  const { palette } = useContext(ThemeContext);
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const styles = createStyles(palette);

  useEffect(() => {
    if (isRunning) {
      return undefined;
    }

    setSecondsLeft(selectedMinutes * 60);

    return undefined;
  }, [selectedMinutes, isRunning]);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          setIsRunning(false);
          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const progress = useMemo(() => {
    const totalSeconds = selectedMinutes * 60;

    if (totalSeconds === 0) {
      return 0;
    }

    return Math.max(0, Math.min(1, 1 - secondsLeft / totalSeconds));
  }, [secondsLeft, selectedMinutes]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Focus sprint</Text>
        <Text style={styles.title}>Deep work timer</Text>
        <Text style={styles.description}>
          Run short focus sessions to reduce context switching and ship priority tasks faster.
        </Text>
      </View>

      <View style={styles.timerCard}>
        <Text style={styles.timerLabel}>{isRunning ? "Session in progress" : "Ready to focus"}</Text>
        <Text style={styles.timerValue}>{formatTime(secondsLeft)}</Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        <View style={styles.chips}>
          {sessionOptions.map((minutes) => {
            const isActive = selectedMinutes === minutes;

            return (
              <Pressable
                key={minutes}
                onPress={() => setSelectedMinutes(minutes)}
                disabled={isRunning}
                style={[
                  styles.chip,
                  {
                    borderColor: isActive ? palette.accent : palette.border,
                    backgroundColor: isActive ? palette.accentSoft : palette.surface,
                    opacity: isRunning ? 0.7 : 1,
                  },
                ]}
              >
                <Text style={[styles.chipText, { color: isActive ? palette.text : palette.textMuted }]}>
                  {minutes} min
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.controls}>
          <Pressable
            style={[styles.controlButton, { backgroundColor: palette.accent, borderColor: palette.accent }]}
            onPress={() => setIsRunning((current) => !current)}
          >
            <Text style={styles.controlText}>{isRunning ? "Pause" : "Start"}</Text>
          </Pressable>

          <Pressable
            style={[
              styles.controlButton,
              {
                backgroundColor: palette.surface,
                borderColor: palette.border,
              },
            ]}
            onPress={() => {
              setIsRunning(false);
              setSecondsLeft(selectedMinutes * 60);
            }}
          >
            <Text style={[styles.controlText, { color: palette.text }]}>Reset</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Recommended loop</Text>
        <Text style={styles.tipText}>Focus for 25 minutes, take a 5 minute break, then review your todo list.</Text>
        <Text style={styles.tipText}>Use 45 minute sessions only for single high-impact tasks to avoid fatigue.</Text>
      </View>
    </ScrollView>
  );
}
